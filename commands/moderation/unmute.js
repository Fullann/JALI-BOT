const Discord = require("discord.js");
const {MESSAGES} = require("../../util/constants")

module.exports.run =  async (bot,message,args,settings,settingsUser,queue) => {
        
    let muteUser = amessage.mentions.users.first();
    if(!muteUser) return message.channel.send(`${bot.config.emojis.error} - L'utilisateur n'existe pas`)
    let muteRole = message.guild.roles.cache.find(m => m.name == "muted");

    
    if(!muteUser.roles.cache.has(muteRole.id)) return message.reply(`${muteUser} n'est pas mute`)
    muteUser.roles.remove(muteRole.id);
    message.channel.send(`<@${muteUser.id}> n'est plus muté`);
}

module.exports.help = MESSAGES.COMMANDS.MODE.UNMUTE;