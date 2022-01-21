const { id } = require("common-tags");
const { MessageEmbed } = require("discord.js");

module.exports = async (bot, role1,role2) => {
    const settings = await (bot.getGuild(role1.guild));

    if (settings.guiLog && settings.guiLogsRoles && settings.guiLogChannel !== null) {
        let logChannel = bot.channels.cache.find(c => c.id == settings.guiLogChannel);
        const embedlog = new MessageEmbed()
        .setTimestamp()
        .setColor(`${bot.config.color.medium}`)
        .setTitle(`Modification de role : ${role2.name}`)
        .setFooter(`ID : ${role2.id}`)

        if(role1.name !== role2.name){
            embedlog.addField("Nom",`${role1.name} => ${role2.name}`)
        }

        if(role1.hexColor !== role2.hexColor){
            embedlog.addField("Couleur",`${role1.hexColor} => ${role2.hexColor}`)
        }

        if(role1.mentionable !== role2.mentionable){
            embedlog.addField("Mentionable",`${role1.mentionable ? "Oui" : "Non"} => ${role2.mentionable ? "Oui" : "Non"}`)
        }

        if(role1.hoist !== role2.hoist){
            embedlog.addField("Affiché séparément",`${role1.hoist ? "Oui" : "Non"} => ${role2.hoist ? "Oui" : "Non"}`)
        }

        if(role1.permissions.serialize() !== role2.permissions.serialize()){
            let messagePos = "";
            let messageNeg = "";
            for (let i in role1.permissions.serialize()) {
                if(!role1.permissions.serialize()[i] && role2.permissions.serialize()[i]){
                    messagePos += `${i},`
                }

                if(role1.permissions.serialize()[i] && !role2.permissions.serialize()[i]){
                    messageNeg += `${i},`
                }
            }

            if(messagePos !== ""){
                let messagep = await bot.permTranslate(messagePos);
                embedlog.addField("Permission ajoutées",`${messagep}`)
            }

            if(messageNeg !== ""){
                let messagen = await bot.permTranslate(messageNeg);
                embedlog.addField("Permission supprimée",`${messagen}`)
            }
        }
        logChannel.send(embedlog)
    }
}