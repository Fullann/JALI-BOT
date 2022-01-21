const Discord = require("discord.js");
const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args,settings,settingsUser,queue) => {

    let banUser;
    try{
        banUser =  await bot.users.fetch(args[0]);
    }
    catch{
        return message.reply(`${bot.emotes.error} - Veuilliez mettre un id`)
    }
    
    if(!banUser) return message.channel.send(`${bot.emotes.error} - L'utilisateur n'existe pas`)

    let banEmbed =new Discord.MessageEmbed()
    .setAuthor(`[ UNBAN ] ${banUser.tag}`, banUser.displayAvatarURL())
    .setColor(bot.config.color.add)
    .addField("Utilisateur Unban", `${banUser}`)
    .addField("Modérateur", `${message.author}`)
    .setTimestamp()

    let Embed =new Discord.MessageEmbed()
    .setColor(bot.config.color.add)
    .setDescription(`**${bot.emotes.success} - ${banUser.tag} a été n'est plus banni**`)
    .setTimestamp()
    .setAuthor(`[ UNBAN ] ${banUser.tag}`, banUser.displayAvatarURL())
    .setFooter(`ID : ${banUser.id}`)



    await banUser.send(`Tu as été unban du serveur ${message.guild.name} par ${message.author.tag}`)

    let logChannel = message.guild.channels.cache.find(c => c.id == settings.guiLogChannel) || message.channel; 

    message.guild.members.unban(banUser);
    logChannel.send(banEmbed);
    message.channel.send(Embed);
}

module.exports.help = MESSAGES.COMMANDS.MODE.UNBAN;