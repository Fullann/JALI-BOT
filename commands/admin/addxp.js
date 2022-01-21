const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args,settings,settingsUser,translate) =>{
    const user = await bot.getMember(message, args[0]);
    const xpToAdd = parseInt(args[1]);
    if(isNaN(xpToAdd)) return message.channel.send(translate("NO_XP",bot));
    await bot.updateUserSettings(message.guild, "useXp", settingsUser.useXp + xpToAdd,user.id);
    await bot.updateUserSettings(message.guild, "useNiv", 0,user.id);
    message.channel.send(translate("ADD_XP_SUCCESS",bot,xpToAdd,user))
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.ADMIN.ADDXP;   