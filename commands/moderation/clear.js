const { MESSAGES } = require("../../util/constants")
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, settings, settingsUser) => {
    if (message.deletable) {
        message.delete();
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.reply(`${bot.emotes.error} - Ce n'est pas un chiffre`);
    }

    let deleteAmount;

    if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true)
        .then(deleted => message.channel.send(`J'ai supprimer \`${deleted.size}\` messages.`).then(message => message.delete({ timeout: 5000 })))
        .catch(err => message.reply(`Quelque chose c'est mal déroulé.. ${err}`));


    if (settings.guiLog) {
        let deleteEmbed = new Discord.MessageEmbed()
            .setTitle("Delete")
            .setColor("#ebe834")
            .addField("Utilisateur ayant supprimer", `${message.author} ID: ${message.author.id}`)
            .addField("Nombre de message ", deleteAmount)
            .addField("Canal ", message.channel)
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL())

        let logChannel = message.guild.channels.cache.find(c => c.id == settings.guiLogChannel);
        logChannel.send(deleteEmbed);
    }

}

module.exports.help = MESSAGES.COMMANDS.MODE.CLEAR;