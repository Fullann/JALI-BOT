const { MessageEmbed } = require("discord.js");
const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot, message, args, settings, settingsUser, translate) => {

    const embed = new MessageEmbed()
        .setColor(bot.config.color.bot)
        .setTitle(translate("HELP_TITLE",bot))
        .setDescription(`Liste de toutes les commandes disponibles sur \`${message.guild.name}\`\nPour plus d'information sur chaque commande faites \`${settings.guiPrefix}help <command_name>\``)
        .addField("En cas d'oublis du prefix", `\`prefix?\``)

    if (bot.checkRole(message.member)) {
        embed.addField(
            translate("CATEGORIE_ADMIN"),
            `${bot.commands.filter(cat => cat.help.category === "admin").map(cmd => cmd.help.name).join(', ')}`
        )
    }
    embed.addField(
        translate("CATEGORIE_INFO"),
        `${bot.commands.filter(cat => cat.help.category === "info").map(cmd => cmd.help.name).join(', ')}`
    )
    if (settings.guiCatFun) {
        embed.addField(
            translate("CATEGORIE_FUN"),
            `${bot.commands.filter(cat => cat.help.category === "fun").map(cmd => cmd.help.name).join(', ')}`
        )
    }
    if (settings.guiCatModeration) {
        embed.addField(
            translate("CATEGORIE_MODERATION"),
            `${bot.commands.filter(cat => cat.help.category === "moderation").map(cmd => cmd.help.name).join(', ')}`
        )
    }
    if (settings.guiCatMusic) {
        embed.addField(
            translate("CATEGORIE_MUSIC"),
            `${bot.commands.filter(cat => cat.help.category === "music").map(cmd => cmd.help.name).join(', ')}`
        )
    }
    if (settings.guiCatPoll) {
        embed.addField(
            translate("CATEGORIE_QUSTION"),
            `${bot.commands.filter(cat => cat.help.category === "question").map(cmd => cmd.help.name).join(', ')}`
        )
    }
    if (settings.guiCatRole) {
        embed.addField(
            translate("CATEGORIE_REACTION"),
            `${bot.commands.filter(cat => cat.help.category === "role").map(cmd => cmd.help.name).join(', ')}`
        )
    }
    if (settings.guiCatUtils) {
        embed.addField(
            translate("CATEGORIE_UTILS"),
            `${bot.commands.filter(cat => cat.help.category === "utils").map(cmd => cmd.help.name).join(', ')}`
        )
    }
    if (settings.guiPersonnel) {
        embed.addField(
            translate("CATEGORIE_PERSO"),
            `${bot.commands.filter(cat => cat.help.category === "servperso").map(cmd => cmd.help.name).join(', ')}`
        )
    }
    //On envoie
    return message.channel.send(embed);
}
module.exports.help = exportsCommandName().MESSAGES.COMMANDS.INFO.H;