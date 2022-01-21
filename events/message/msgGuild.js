const Discord = require("discord.js");

module.exports = async (bot, message) => {
    if (message.author.bot) return;
    let args = message.content.split(" ");

    if(message.channel.parentID == bot.config.channelPerso.channelAsk){
        let member = bot.users.cache.get(message.channel.name.split('ticket-')[1]);
        
        let embedTicket = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`Ticket - Réponse`)
        .setColor(bot.config.color.bot)
        .setTimestamp()
        .setDescription(`${message.content}`)
        .setFooter(`ID: ${message.author.id}`, message.author.avatarURL())

        member.send(embedTicket)
    }

    
    if(message.content.toLowerCase() =="hello"){
        message.channel.send("Bonjour "+ message.author.username+". Comment allez-vous?")}
    if(message.content.toLowerCase() =="bonjour"){
    message.channel.send("Quelle belle journée très chère "+ message.author.username+". Comment allez-vous en ce jour?")}
    if(message.content.toLowerCase() =="salut"){
        message.channel.send("Salutation à toi "+ message.author.username+".Comment ça va ?")}
    if(message.content === "bien ett")
    message.channel.send("Bien merci !!!")
    if(message.content.toLowerCase() ==`${bot.config.name}`){
    message.channel.send(":heart: :heart: :heart: ")
    message.channel.send("Que puis-je faire pour vous ?")}
    if(message.content.toLowerCase() =="trkl ett"){
        message.channel.send("Bien refre")}
    if(message.content.toLowerCase() =="waouh"){
        message.channel.send("WAAAAAAAAAAAOOOOOOOOOOOOOOOUUUUUUUUUUUUUUUUUHHHHHHHHH !!!!!!!!!!!!!!!!!!")}
}