const { MessageEmbed } = require("discord.js");

module.exports = async (bot, guild, user) => {
    const settings = await (bot.getGuild(guild));

    //Check des logs
    const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    });
    const banLog = fetchedLogs.entries.first();

    if (banLog && settings.guiLog && settings.guiLogsLeaveModertion && settings.guiLogChannel !== null) {

        let logChannel = bot.channels.cache.find(c => c.id == settings.guiLogChannel);

        let banEmbed = new MessageEmbed()
            .setColor(bot.config.color.delete)
            .addField("Utilisateur ban", `${banLog.target}`)
            .addField("Modérateur", `${banLog.executor}`)
            .setTimestamp()
            .setAuthor(`[ BAN ] ${banLog.target.tag}`, banLog.target.displayAvatarURL())
            .setFooter(`ID de l'utilisateur : ${banLog.target.id}`)

        //Si il y a une raison
        if (banLog.reason != null) {
            banEmbed.addField("Raison", banLog.reason)
        }

        //On envoie
        logChannel.send(banEmbed)
    }
    else {
        if (settings.guiLog && settings.guiLogsLeaveModertion && settings.guiLogChannel !== null) {
            //On get le channel de log
            let logChannel = bot.channels.cache.find(c => c.id == settings.guiLogChannel);

            const embedlog = new MessageEmbed()
                .setColor(`${bot.config.color.delete}`)
                .setDescription(`**${bot.config.emojis.lock} - ${user} a été banni**`)
                .setTimestamp()
                .setFooter(`ID : ${user.id}`)
                .setAuthor(`${user.tag}`, user.displayAvatarURL())

            //On envoie
            logChannel.send(embedlog)
        }
    }
}