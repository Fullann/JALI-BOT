const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{

        if (!bot.player.getQueue(message)) return message.channel.send(`${bot.config.emojis.error} - Aucune musique n'est lancée !`);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`${bot.config.emojis.error} - Votre nombre n'est pas valide !\nIl doit être 1 et 100.`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`${bot.config.emojis.error} - Votre nombre n'est pas entre 1 et 100 !`);

        bot.player.setVolume(message, parseInt(args[0]));

        message.channel.send(`${bot.config.emojis.success} - Volume mis a **${parseInt(args[0])}%** !`);
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.VOLUME;