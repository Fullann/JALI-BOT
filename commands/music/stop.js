const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message) =>{

        if (!bot.player.getQueue(message)) return message.channel.send(`${bot.emotes.error} - Aucune musique n'est lancée !`);

        bot.player.setRepeatMode(message, false);
        bot.player.stop(message);

        message.channel.send(`${bot.emotes.success} - Musique **arrêtée** !`);
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.STOP;