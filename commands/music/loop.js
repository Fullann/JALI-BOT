const { MESSAGES } = require("../../util/constants")

module.exports.run = async (bot, message) => {


    if (bot.player.getQueue(message).repeatMode) {
        bot.player.setRepeatMode(message, false);
        return message.channel.send(`${bot.emotes.success} - Répétition  **OFF** !`);
    } else {
        bot.player.setRepeatMode(message, true);
        return message.channel.send(`${bot.emotes.success} - Répétition **ON** La musique va tournée en boucle !`);
    };
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.LOOP;