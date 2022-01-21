const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args) =>{
    
    if (!bot.player.getQueue(message)) return message.channel.send(`${bot.config.emojis.error} - Aucune musique n'est lancée !`);

        if (bot.player.getQueue(message).tracks.length <= 1) return message.channel.send(`${bot.config.emojis.error} - Il y a seulement une musique dans la liste`);

        bot.player.clearQueue(message);

        message.channel.send(`${bot.config.emojis.success} - La liste a été **clear** !`);
};

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MUSIC.CLEAR;