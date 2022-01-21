const {exportsCommandName} = require("../../util/loader")
const Discord = require('discord.js');

module.exports.run = async (bot,message,args) =>{
    let roleList = await bot.getAllList(message.guild);
    if(!roleList) return message.channel.send(`${bot.config.emojis.error} - Vous n'avez pas de message réaction`)
   
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Message reactiond de ${message.guild.name}`)
    .setDescription("List de touts vos messages réactions")
    roleList.forEach(values => {
        embed.addField(`${values.listName}`,`Est actiff : ${values.isActive}`)
    });

    message.channel.send(embed);
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.ROLE.CLISTS;  