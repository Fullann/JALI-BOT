const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args) =>{

        bot.player.play(message, args.join(" "));
};

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MUSIC.SEARCH;