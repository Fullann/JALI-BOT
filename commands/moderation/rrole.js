const Discord = require("discord.js");
const {exportsCommandName} = require("../../util/loader")

module.exports.run =  async (bot,message,args,settings,settingsUser,queue) => {

    let membeRrole = message.mentions.members.first();
    if(!membeRrole) return message.channel.send(`${bot.config.emojis.error} - L'utilisateur n'existe pas`);
    if(!args[1])return message.channel.send(`${bot.config.emojis.error} - Spécifier un role`)

  let role = message.guild.roles.cache.find(r => r.id == message.mentions.roles.first());
  if(!role) return message.channel.send(`${bot.config.emojis.error} - Role introuvable`);

    if(!membeRrole.roles.cache.has(role.id))return message.channel.send(`${bot.config.emojis.error} - L'utilisateur ne possede pas se role`);
    await membeRrole.roles.remove(role);

    let roleEmbed =new Discord.MessageEmbed()
     .setTitle("Remove Role")
     .setColor("#de3333")
     .addField("Utilisateur ayant perdu le role", `${membeRrole} ID: ${membeRrole.id}`)
     .addField("Utilisateur ayant enlevé le role", `${message.author} ID: ${message.author.id}`)
     .addField("Role enlevé ",role )
     .setTimestamp()
     .setFooter(message.author.username,message.author.avatarURL())

     await membeRrole.send(`Désolé, ${message.author} t'as enlevé le role ${role.name}.`);
     let logChannel = message.guild.channels.cache.find(c => c.id == settings.guiLogChannel) || message.channel;
    logChannel.send(roleEmbed);
     
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MODE.RROLE;