const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message) =>{

        if (!bot.player.getQueue(message)) return message.channel.send(`${bot.config.emojis.error} - Aucune musique n'est lancée !`);

        bot.player.setRepeatMode(message, false);
        bot.player.stop(message);

        message.channel.send(`${bot.config.emojis.success} - Musique **arrêtée** !`);
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.STOP;