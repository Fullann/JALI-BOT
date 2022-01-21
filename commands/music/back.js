const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{
    
    bot.player.back(message)
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.BACK;