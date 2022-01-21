const Discord = require("discord.js");
const ms = require('ms');
const {exportsCommandName} = require("../../util/loader")

module.exports.run =  async (bot,message,args,settings,settingsUser) => {
        
    let muteUser = message.mentions.users.first();
    if(!muteUser) return message.channel.send(`${bot.config.emojis.error} - L'utilisateur n'existe pas`)
    let muteTime = args[1] || '10min';
    let muteRole = message.guild.roles.cache.find(m => m.name == "muted");

    //création du role
    if(!muteRole){
        await bot.createRoleMute(message);
        muteRole = message.guild.roles.cache.find(m => m.name == "muted");
    }
    
    await muteUser.roles.add(muteRole.id);
    message.channel.send(`${bot.config.emojis.success} - <@${muteUser.id}> est muté pour ${ms(ms(muteTime))}`);

    let muteEmbed =new Discord.MessageEmbed()
    .setTitle("Mute")
    .setColor("#fcec03")
    .addField("Utilisateur muté", `${muteUser} ID: ${muteUser.id}`)
    .addField("Utilisateur ayant mute", `${message.author} ID: ${message.author.id}`)
    .addField("Canal ", message.channel)
    .addField("Temps",muteTime)
    .setTimestamp()
    .setFooter(message.author.username,message.author.avatarURL())
    
    let logChannel = message.guild.channels.cache.find(c => c.id == settings.guiLogChannel) || message.channel;
    logChannel.send(muteEmbed);
    
    
        setTimeout(() =>{
            if(muteUser.roles.cache.has(muteRole.id)){
            muteUser.roles.remove(muteRole.id);
            message.channel.send(`${bot.config.emojis.success} - <@${muteUser.id}> n'est plus muet`)
            }
        },ms(muteTime))
    
    
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MODE.MUTE;