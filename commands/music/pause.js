const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{

    if (!bot.player.getQueue(message)) return message.channel.send(`${bot.emotes.error} - Aucune musique n'est lancée !`);

        if (bot.player.getQueue(message).paused) return message.channel.send(`${bot.emotes.error} - La musique est déjs en pause !`);

        bot.player.pause(message);

        message.channel.send(`${bot.emotes.success} - Musique ${bot.player.getQueue(message).playing.title} en pause !`);
}


module.exports.help = MESSAGES.COMMANDS.MUSIC.PAUSE;