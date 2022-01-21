const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot, message) => {


    if (bot.player.getQueue(message).repeatMode) {
        bot.player.setRepeatMode(message, false);
        return message.channel.send(`${bot.config.emojis.success} - Répétition  **OFF** !`);
    } else {
        bot.player.setRepeatMode(message, true);
        return message.channel.send(`${bot.config.emojis.success} - Répétition **ON** La musique va tournée en boucle !`);
    };
};

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MUSIC.LOOP;