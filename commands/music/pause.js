const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args) =>{

    if (!bot.player.getQueue(message)) return message.channel.send(`${bot.config.emojis.error} - Aucune musique n'est lancée !`);

        if (bot.player.getQueue(message).paused) return message.channel.send(`${bot.config.emojis.error} - La musique est déjs en pause !`);

        bot.player.pause(message);

        message.channel.send(`${bot.config.emojis.success} - Musique ${bot.player.getQueue(message).playing.title} en pause !`);
}


module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MUSIC.PAUSE;