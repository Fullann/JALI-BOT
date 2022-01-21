const {exportsCommandName} = require("../../util/loader")
const he = require('he');
const Discord = require('discord.js');

module.exports.run = async (bot,message,args) =>{
    let listRoles = await bot.getListRole(message.guild,args[0]);
    if(!listRoles) return message.channel.send(`${bot.config.emojis.error} - Il n'y a pas de message reaction avec ce nom`);

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Message reaction : ${args[0]}`)
    .setDescription("Réagisser au réaction pour vous attribuer son role")
    listRoles.listRole.forEach(values => {
        embed.addField(`${he.decode(values.emodji)}`,`${values.idRole}`)
    });

    let send = await message.channel.send(embed);
    for (let i = 0; i < listRoles.listRole.length; i++) {
        await send.react(`${he.decode(listRoles.listRole[i].emodji)}`);
      }
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.ROLE.CEMBED;  