const Discord = require("discord.js");

module.exports = async (bot, message) => {
    if (message.author.bot) return;
    let args = message.content.split(" ");

    if (args[0].toLowerCase() == bot.config.prefix + "ticket") {
        //Création du channel
        let channel = await bot.guilds.cache.get(`${bot.config.guildManage}`).channels.create(`Ticket - ${message.author.id}`, { type: 'text', parent: bot.guilds.cache.get(`${bot.config.guildManage}`).channels.cache.get(bot.config.channelPerso.channelAsk) });

        //Embed pour la demande
        let embed = new Discord.MessageEmbed()
            .setTitle("Ticket ouvert")
            .setColor(bot.config.color.add)
            .setTimestamp()
            .setDescription(`Le support de ${bot.config.name} vous répondera dès que possible.\nAppuyer sur le cadenas pour fermer votre ticket`)
            .setFooter(`ID de la demande ${channel.id}`, bot.user.avatarURL())

        message.author.send(embed).then(msg => msg.react('🔒'))

        //Embed qui va dans le serveur
        let embedTicket = new Discord.MessageEmbed()
            .setTitle(`Ticket - ${bot.config.name}`)
            .setColor(bot.config.color.bot)
            .setTimestamp()
            .setDescription(`**Demande** : ${message.content.split('<ticket')[1]}\n**Utilisateur**:${message.author}`)
            .setFooter(`ID: ${message.author.id}`, message.author.avatarURL())

        return channel.send(embedTicket).then(msg => msg.react('🔒'));;
    }

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Message - Jali')
        .setColor(bot.config.color.rdm)
        .setTimestamp()
        .setDescription('Pour valider votre réponse écriver send.\n' + message.content)
        .setFooter(`ID : ${message.author.id}`)

    bot.channels.cache.get(bot.config.channelPerso.channelToJali).send(embed).then(msg => msg.react('📨'))
}