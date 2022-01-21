const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{

        if (!bot.player.getQueue(message)) return message.channel.send(`${bot.config.emojis.error} - Aucune musique n'est lancée !`);

        if (!bot.player.getQueue(message).paused) return message.channel.send(`${bot.config.emojis.error} - La musique est déja lancée !`);

        bot.player.resume(message);

        message.channel.send(`${bot.config.emojis.success} - Musique ${bot.player.getQueue(message).playing.title} relancé !`);
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.RESUME;