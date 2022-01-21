const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args) =>{

        bot.player.play(message, args.join(" "), { firstResult: true });
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MUSIC.PLAY;