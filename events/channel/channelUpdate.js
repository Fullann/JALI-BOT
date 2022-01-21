const { MessageEmbed } = require("discord.js");

module.exports = async (bot, channel1, channel2) => {
    if (channel1.type !== "dm") {

        const settings = await (bot.getGuild(channel1.guild));

        if (settings.guiLog && settings.guiLogsChannels && settings.guiLogChannel !== null) {
            let logChannel = bot.channels.cache.find(c => c.id == settings.guiLogChannel);

            const embedlog = new MessageEmbed()
                .setTimestamp()
                .setColor(`${bot.config.color.medium}`)
                .setDescription(`**Modification de channel ${await bot.translateCType(channel2.type)} : ${channel2}**`)
                .setFooter(`ID : ${channel2.id}`)

            if (channel1.name !== channel2.name) {
                embedlog.addField("Nom", `${channel1.name} => ${channel2.name}`)
            }

            if (channel1.parent !== channel2.parent) {
                mbedlog.addField("Catégorie", `${channel1.parent !== null ? channel1.parent.name : "Pas de catégorie"} => ${channel2.parent !== null ? channel2.parent.name : "Pas de catégorie"}`)
            }

            if (channel1.permissionOverwrites.array() !== channel2.permissionOverwrites.array()) {
                const embedlogPerm = new MessageEmbed()
                .setTimestamp()
                .setColor(`${bot.config.color.medium}`)
                
                let messagePosC = "";
                let messageNegC = "";
                let role = "";
                //Boucle pour les role
                for (let i in channel2.permissionOverwrites.array()) {
                    //Pour les roles enlevées
                    if (channel1.permissionOverwrites.array()[i].deny.serialize() !== channel2.permissionOverwrites.array()[i].deny.serialize()) {
                        for (let j in channel2.permissionOverwrites.array()[i].deny.serialize()) {
                            if(!channel1.permissionOverwrites.array()[i].deny.serialize()[j] && channel2.permissionOverwrites.array()[i].deny.serialize()[j]){
                                messageNegC += `${j},`
                                role = channel2.guild.roles.cache.find(r => r.id == channel2.permissionOverwrites.array()[i].id);
                            }
                        }
                    }

                    //Pour les ajouts
                    if (channel1.permissionOverwrites.array()[i].allow.serialize() !== channel2.permissionOverwrites.array()[i].allow.serialize()) {
                        for (let j in channel2.permissionOverwrites.array()[i].allow.serialize()) {
                            if(!channel1.permissionOverwrites.array()[i].allow.serialize()[j] && channel2.permissionOverwrites.array()[i].allow.serialize()[j]){
                                messagePosC += `${j},`
                                role = channel2.guild.roles.cache.find(r => r.id == channel2.permissionOverwrites.array()[i].id);
                            }
                        }
                    }
                }

                if (messagePosC !== "") {
                    let messagep = await bot.permTranslate(messagePosC);
                    embedlogPerm.addField("Permission ajoutées", `${messagep}`)
                }

                if (messageNegC !== "") {
                    let messagen = await bot.permTranslate(messageNegC);
                    embedlogPerm.addField("Permission supprimée", `${messagen}`)
                }

                embedlogPerm.setDescription(`**Modification des permissions du channel ${await bot.translateCType(channel2.type)} : ${channel2}**\nEdition des permission pour ${role}`)
                    .setFooter(`ID du salon : ${channel2.id} | Id du role : ${role.id}`)
                if(role !== undefined){
                    logChannel.send(embedlogPerm)
                }
            }
            else{
                logChannel.send(embedlog)
            }
        }
    }
}