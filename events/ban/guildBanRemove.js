const { MessageEmbed } = require("discord.js");

module.exports = async (bot, guild , user) => {
    const settings = await (bot.getGuild(guild));

    if (settings.guiLog && settings.guiLogsLeaveModertion && settings.guiLogChannel !== null) {
        let logChannel = bot.channels.cache.find(c => c.id == settings.guiLogChannel);
        

        const embedlog = new MessageEmbed()
            .setColor(`${bot.config.color.add}`)
            .setDescription(`**${bot.config.emojis.unlock} - ${user} a été dé-banni**`)
            .setTimestamp()
            .setFooter(`ID : ${user.id}`)
            .setAuthor(`${user.tag}`, user.displayAvatarURL())
            
        logChannel.send(embedlog)

    }
}