const Discord = require("discord.js");
const { MESSAGES } = require("../../util/constants")

module.exports.run = async (bot, message, args, settings, settingsUser, translate) => {

    //Création de l embed
    let botEmbed = new Discord.MessageEmbed()
        .setTitle(translate("BOT_TITLE",bot))
        .setColor(bot.config.color.bot)
        .setFooter(`${bot.user.username}`, bot.user.avatarURL())
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .addFields(
            { name: translate("BOT_ABRE"), value: `Just A Little Intelligence`, inline: true },
            { name: translate("BOT_CREAT_AT"), value: `${await bot.formatDate(bot.user.createdAt)}`, inline: true },
            { name: '\u200b', value: `\u200b`, inline: true },
            { name: translate("BOT_AUTOR"), value: `Fullann`, inline: true },
            { name: translate("BOT_VERSION"), value: `${bot.config.version}`, inline: true },
            { name: '\u200b', value: `\u200b`, inline: true },
            { name: translate("BOT_MEMORY"), value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, inline: true },
            { name: 'Uptime', value: `${Math.floor(bot.uptime / 1000 / 60).toString()} min`, inline: true },
            { name: 'Commandes', value: `${bot.commandsNumber}`, inline: true },
            { name: 'Serveurs', value: `${bot.guilds.cache.size.toString()}`, inline: true },
            { name: 'Salons', value: `${bot.channels.cache.size.toString()}`, inline: true },
            { name: 'Users', value: `${bot.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`, inline: true },
            { name: 'Discord', value: `${Discord.version}`, inline: true },
            { name: 'Node', value: `${process.version}`, inline: true },
            { name: translate("BOT_ADD"), value: `[Web site](https://discord.com/oauth2/authorize?client_id=690635409515872286&scope=bot&permissions=2147483647)`, inline: true },
        );

    //Envoie en mp
    message.author.send(botEmbed);

    //Envoie dans la guild
    message.channel.send(translate("SEND_MP",bot));

}

module.exports.help = MESSAGES.COMMANDS.INFO.BOTINFO;

