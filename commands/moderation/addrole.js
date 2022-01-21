const Discord = require("discord.js");
const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args,settings,settingsUser,queue) => {

        let membeRrole = message.mentions.members.first();
        let role = message.guild.roles.cache.find(r => r.id == message.mentions.roles.first());
        if(!membeRrole) return message.channel.send(`${bot.config.emojis.error} - L'utilisateur n'existe pas`)
          if(!role)return message.channel.send(`${bot.config.emojis.error} -Spécifier un role`);
    
      if(!role) return message.channel.send(`${bot.config.emojis.error} -Role introuvable`);
        if(membeRrole.roles.cache.has(role.id))return message.channel.send(`${bot.config.emojis.error} -L'utilisateur possède déja ce role.`);
        await membeRrole.roles.add(role);
    
        let roleEmbed =new Discord.MessageEmbed()
        .setTitle("Add Role")
        .setColor(bot.config.color.add)
        .addField("Utilisateur avec le nouveau role", `${membeRrole} ID: ${membeRrole.id}`)
        .addField("Utilisateur ayant ajouté le role", `${message.author} ID: ${message.author.id}`)
        .addField("Role ajouter ",role )
        .setTimestamp()
        .setFooter(message.author.username,message.author.avatarURL())
            
    await membeRrole.send(`Bravo, tu as reçu le role ${role.name}.`) 
    let logChannel = message.guild.channels.cache.find(c => c.id == settings.guiLogChannel) || message.channel;
    logChannel.send(roleEmbed);
        
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MODE.ADDROLE;