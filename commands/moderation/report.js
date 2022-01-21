const Discord = require("discord.js");
const {MESSAGES} = require("../../util/constants")

module.exports.run =  async (bot,message,args,settings,settingsUser,queue) => {
  
   let reportedUser = message.mentions.users.first();
   if(!reportedUser) return message.channel.send(`${bot.emotes.error} - L'utilisateur n'existe pas`);
   let reportedReason = args[1];
   if(!reportedReason)return message.reply(`${bot.emotes.error} - Veuilliez mettre une raison`)
   if(reportedUser == message.author.id)return message.reply("T'es sur de vouloir t'auto report ???")
  
   let reportEmbed =new Discord.MessageEmbed()
   .setTitle("Reports")
   .setColor("#f38e40")
   .addField("Utilisateur reporté", `${reportedUser} ID: ${reportedUser.id}`)
   .addField("Utilisateur ayant reporté", `${message.author} ID: ${message.author.id}`)
   .addField("Canal ", message.channel)
   .addField("Raison",reportedReason)
   .setTimestamp()
   .setFooter(message.author.username,message.author.avatarURL())
   let logChannel;
  if(settings.guiReportChannel){
    logChannel = message.guild.channels.cache.find(c => c.id == settings.guiReportChannel); 
  }
  else{
    logChannel = message.guild.channels.cache.find(c => c.id == settings.guiLogChannel) || message.channel;
  }
   
  logChannel.send(reportEmbed);
}

module.exports.help = MESSAGES.COMMANDS.MODE.REPORT;