const { MessageEmbed } = require("discord.js");

module.exports = async (client,message) => {
    if(message.content && message.content.includes("<@")){
        const embed = new MessageEmbed()
        .setColor(client.config.color.rdm)
        .setAuthor("GHOSTPING",message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.author.id)
        .addField('Contenue du message', message.content.length < 1024 ? message.content : "Message trop long")
        .addField("Utilisateur ayant envoyé le message", message.author)

        message.channel.send(embed)
    }
 
};