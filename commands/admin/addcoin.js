const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args,settings,settingsUser,translate) =>{
    const user = await bot.getMember(message, args[0]);
    const coinToAdd = parseInt(args[1]);
    if(isNaN(coinToAdd)) return message.channel.send(translate("NO_AMOUNT",bot));
    await bot.updateUserSettings(message.guild, "useCoin", settingsUser.useCoin + coinToAdd ,user.id);
    message.channel.send(translate("ADD_COINS_SUCCESS_ADMIN",bot,coinToAdd,user))
}

module.exports.help = MESSAGES.COMMANDS.ADMIN.ADDMONNEY;   