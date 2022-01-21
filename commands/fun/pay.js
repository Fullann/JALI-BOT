const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot, message, args, settings, settingsUser,translate) => {

  if(isNaN(args[1])) return message.channel.send(translate("NO_AMOUNT",bot))
  
  let pUser = await bot.getMember(message, args[0]);
  let pCoins = pUser.id;
  let sCoins = settingsUser.useCoin;

  const settingsUser2 = await bot.getUser(message.guild, pCoins);

  if (!settingsUser2) return message.channel.send(translate("NO_ACCOUNT",bot,message));

  if (sCoins < args[1]) return message.reply(translate("NOT_ENOUGH_MONEY",bot));

  let monneyMoins = Number(settingsUser.useCoin) - parseInt(args[1]);
  
  await bot.updateUserSettings(message.guild, "useCoin",monneyMoins, message.author.id)

  let monneyPlus = Number(settingsUser2.useCoin) + parseInt(args[1])
  await bot.updateUserSettings(message.guild, "useCoin", monneyPlus, pCoins)

  message.channel.send(translate("ADD_COINS_SUCCESS",bot,message,args,pUser));

}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.FUN.PAY;