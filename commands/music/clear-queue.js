const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{
    
    if (!bot.player.getQueue(message)) return message.channel.send(`${bot.emotes.error} - Aucune musique n'est lancée !`);

        if (bot.player.getQueue(message).tracks.length <= 1) return message.channel.send(`${bot.emotes.error} - Il y a seulement une musique dans la liste`);

        bot.player.clearQueue(message);

        message.channel.send(`${bot.emotes.success} - La liste a été **clear** !`);
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.CLEAR;