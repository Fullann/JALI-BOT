const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args) =>{
    
    bot.player.back(message)
};

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MUSIC.BACK;