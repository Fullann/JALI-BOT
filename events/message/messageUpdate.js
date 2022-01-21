const { MessageEmbed } = require("discord.js");

module.exports = async (client,oldMessage,newMessage) => {
    if(oldMessage.content && oldMessage.content.includes("<@")){
        const embed = new MessageEmbed()
        .setColor(client.config.color.rdm)
        .setAuthor("GHOSTPING",oldMessage.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(oldMessage.author.id)
        .addField('Contenue de l ancien message', oldMessage.content.length < 1024 ? oldMessage.content : "Message trop long")
        .addField("Utilisateur ayant envoyé le message", oldMessage.author)

        oldMessage.channel.send(embed)
    }
 
};