const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot, message, args) => {

    if (!bot.player.getQueue(message)) return message.channel.send(`${bot.config.emojis.error} - Aucune musique n'est lancée !`);

    if (bot.player.getQueue(message).loopMode) {
        bot.player.setLoopMode(message, false);
        return message.channel.send(`${bot.config.emojis.success} - Répétition  **OFF** !`);
    } else {
        bot.player.setLoopMode(message, true);
        return message.channel.send(`${bot.config.emojis.success} - Répétition **ON** La liste va tournée en boucle !`);
    };

};

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MUSIC.QUEUELOOP;