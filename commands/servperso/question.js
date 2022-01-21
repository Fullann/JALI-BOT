const Discord = require('discord.js');
const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot, message, args, settings, settingsUser) => {

    let replies = ["oui", "non", "peut-etre", "surement", "Peut-être que oui peut-être que non"];
    let question = args.slice(0).join(" ");
    let res = Math.floor((Math.random() * replies.length));

    let askEMBED = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor(bot.config.color.inferieur)
        .addField("Question", question)
        .addField("Réponse", replies[res])
        .setThumbnail("https://i.ytimg.com/vi/k7r6ofhUw4o/hqdefault.jpg")
        .setTimestamp()

    message.channel.send(askEMBED);
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.SERVPERSO.ASK;