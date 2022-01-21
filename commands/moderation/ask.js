const Discord = require("discord.js");
const {MESSAGES} = require("../../util/constants")

module.exports.run =  async (bot,message,args,settings,settingsUser,queue) => {
    let msg = "";
    args.forEach(element => {
      msg += " "+element
  });
   let askEmbed =new Discord.MessageEmbed()
   .setTitle("Question")
   .setColor("#3291a8")
   .addField("Utilisateur ayant posé la question", `${message.author} ID: ${message.author.id}`)
   .addField("Canal ", message.channel)
   .addField("Question",msg)
   .setTimestamp()
   .setFooter(message.author.username,message.author.avatarURL())

   let logChannel;

  if(settings.guiReportChannel){
    logChannel = message.guild.channels.cache.find(c => c.id == settings.guiReportChannel); 
  }
  else{
    logChannel = message.guild.channels.cache.find(c => c.id == settings.guiLogChannel) || message.channel;
  }
   
  logChannel.send(askEmbed);
  message.channel.send(`${bot.emotes.success} - Votre demande a été envoyée`)
}

module.exports.help = MESSAGES.COMMANDS.MODE.ASK;