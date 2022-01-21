const Discord = require("discord.js");
const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot, message, args, settings) => {

    let warnUser = message.mentions.members.first();
    if (!warnUser) return message.channel.send(`${bot.config.emojis.error} -  L'utilisateur n'existe pas`)
    let warnReson = args.join(" ").slice(22) || 'Aucune raison spécifiée';

    const settingsUser2 = await bot.getUser(message.guild, warnUser.id);

    if (!settingsUser2) return message.channel.send(`${bot.config.emojis.error} - Cette personne n'a pas encore crée de compte`);


    let actuWarn = settingsUser2.useWarn;

    //On update les warn
    await bot.updateUserSettings(message.guild, "useWarn", Number(settingsUser2.useWarn) - 1, warnUser.id)

    if (Number(actuWarn) != 0) {

        //Si les warn son actif
        if (settings.guiLog && settings.guiLogsWarn && settings.guiLogChannel !== null) {
            //On récupère le channel de log
            let logChannel = message.guild.channels.cache.find(c => c.id == settings.guiLogChannel)

            //On crée l'embed
            let warnEmbed = new Discord.MessageEmbed()
                .setColor(bot.config.color.add)
                .addField("Utilisateur unwarn", `${warnUser}`)
                .addField("Modérateur", `${message.author}`)
                .setTimestamp()
                .setAuthor(`[ UNWARN ] ${warnUser.user.tag}`, warnUser.user.displayAvatarURL())
                .setFooter(`ID de l'utilisateur : ${warnUser.user.id}`)
                .addField("Raison", warnReson)

            //On envoie   
            logChannel.send(warnEmbed)
        }
        else {
            message.channel.send(`${bot.config.emojis.success} - ${warnUser} a été unwarn pour :\n\`${warnReson}\``)
        }
    }
    else {
        return message.channel.send(`${bot.config.emojis.error} - Cette personne n'a pas encore de warn`)
    }
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MODE.UNWARN;