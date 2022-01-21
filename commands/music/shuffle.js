const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{

        if (!bot.player.getQueue(message)) return message.channel.send(`${bot.emotes.error} - Aucune musique n'est lancée !`);

        bot.player.shuffle(message);

        return message.channel.send(`${bot.emotes.success} - Liste des musiques a étée mélagée !`);
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.SHUFFLE;