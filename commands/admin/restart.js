const {exportsCommandName} = require("../../util/loader");

module.exports.run = async (bot,message,args) =>{
  await message.delete();
  await bot.channels.cache.get(bot.config.channelPerso.channelStart).send(`${bot.config.name} redémarre !`);
  await bot.reset(message.guild);
  
  process.exit();
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.ADMIN.RESTART;