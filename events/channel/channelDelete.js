const { MessageEmbed } = require("discord.js");

module.exports = async (bot, channel) => {
    if (channel.type !== "dm") {

        const settings = await (bot.getGuild(channel.guild));

        if(settings.guiLog && settings.guiLogsChannels && settings.guiLogChannel !== null){
        let logChannel = bot.channels.cache.find(c => c.id == settings.guiLogChannel);

            const embedlog = new MessageEmbed()
            .setColor(`${bot.config.color.delete}`)
            .setDescription(`**Suppression de channel ${await bot.translateCType(channel.type)}: ${channel.name}**`)
            .addField("Dans la catégorie",channel.parent !== null ? channel.parent.name : "Pas de catégorie")
            .setFooter(`ID : ${channel.id}`)
            .setTimestamp()
            
            logChannel.send(embedlog)
        }
    }
}