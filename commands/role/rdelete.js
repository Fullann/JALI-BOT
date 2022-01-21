const {MESSAGES} = require("../../util/constants")
const he = require('he');

module.exports.run = async (bot,message,args) =>{
    await bot.deleteRole(message.guild,args[0]);

    message.channel.send(`${bot.config.emojis.success} - La liste ${args[0]} a bien étée supprimée`)
}

module.exports.help = MESSAGES.COMMANDS.ROLE.RDELETE;  