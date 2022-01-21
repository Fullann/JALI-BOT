const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{

        if (!bot.player.getQueue(message)) return message.channel.send(`${bot.emotes.error} - Aucune musique n'est lancée !`);

        bot.player.skip(message);

        message.channel.send(`${bot.emotes.success} - Musique **skipée** !`);
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.SKIP;