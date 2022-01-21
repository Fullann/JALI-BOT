const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{

        if (!bot.player.getQueue(message)) return message.channel.send(`${bot.config.emojis.error} - Aucune musique n'est lancée !`);

        bot.player.shuffle(message);

        return message.channel.send(`${bot.config.emojis.success} - Liste des musiques a étée mélagée !`);
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.SHUFFLE;