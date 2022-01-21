const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{

        bot.player.play(message, args.join(" "));
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.SEARCH;