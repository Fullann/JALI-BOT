const { MessageEmbed } = require("discord.js");

module.exports = async (bot, role) => {
    const settings = await (bot.getGuild(role.guild));

    if (settings.guiLog && settings.guiLogsRoles && settings.guiLogChannel !== null) {
        let logChannel = bot.channels.cache.find(c => c.id == settings.guiLogChannel);
        let messageReturn = "";
        let perm = role.permissions.serialize();
        for (let i in perm) {
            if(perm[i]){
                messageReturn += `${i},`
            }
        }
        let message = await bot.permTranslate(messageReturn)
        const embedlog = new MessageEmbed()
            .setColor(`${bot.config.color.delete}`)
            .setTitle(`Suppression de role : ${role.name}`)
            .setTimestamp()
            .setFooter(`ID : ${role.id}`)
            .addFields(
                {name:'Mentionnable',value: `${role.mentionable ? "Oui" : "Non"}`,inline:true},
                {name:'Afficher séparément',value: `${role.hoist ? "Oui" : "Non"}`,inline:true},
                {name:'Couleur',value: `${role.hexColor}`,inline:true},
                {name:'Permissions',value: `${message}`,inline:true},

                );
            
        logChannel.send(embedlog)

    }
}