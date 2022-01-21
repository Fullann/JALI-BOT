const { MessageEmbed } = require("discord.js");
const {exportsCommandName} = require("../../util/loader")

module.exports.run = (client, message, args) => {
    message.delete();

    if (!message.member.hasPermission('ADMINISTRATOR')) return;

    const embed = new MessageEmbed()
        .setDescription('Réagissez à 📑 pour ouvrir un ticket')
        .setColor(client.config.color.rdm)
        .setTimestamp()
        .setFooter('Ticket')

    message.channel.send(embed)
        .then(msg => msg.react('📑'));

}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.QUEST.OPENTICKET;
