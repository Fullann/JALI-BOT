const Discord = require("discord.js");
const { MESSAGES } = require("../../util/constants")

module.exports.run = async (bot, message, args, settings) => {
    //On récupere la personne mentionner
    let warnUser = message.mentions.members.first();
    if (!warnUser) return message.channel.send(`${bot.config.emojis.error} -  L'utilisateur n'existe pas`)

    //On récupere la raison
    let warnReson = args.join(" ").slice(22);
    if(!warnReson) return message.channel.send(`${bot.config.emojis.error} - Cette personne n'a pas encore crée de compte`);

    //On récupere le compte de la personne mentionner
    const settingsUser2 = await bot.getUser(message.guild, warnUser.id);
    if (!settingsUser2) return message.channel.send(`${bot.config.emojis.error} - Cette personne n'a pas encore crée de compte sur JALI`);

    //On update les warn
    await bot.updateUserSettings(message.guild, "useWarn" ,Number(settingsUser2.warn) + 1 , warnUser.id)

    //On envoie en mp
    await warnUser.send(`Tu t'es pris un warn par ${message.author.tag} pour :\n \`${warnReson}\` `)

    //Si les warn son actif
    if (settings.guiLog && settings.logsWarn && settings.guiLogChannel !== null) {
        //On récupère les channel de log
        let logChannel = message.guild.channels.cache.find(c => c.id == settings.guiLogChannel)
        
        //On crée l'embed
        let warnEmbed = new Discord.MessageEmbed()
            .setColor(bot.config.color.delete)
            .addField("Utilisateur warn", `${warnUser}`)
            .addField("Modérateur", `${message.author}`)
            .setTimestamp()
            .setAuthor(`[ WARN ] ${warnUser.user.tag}`, warnUser.user.displayAvatarURL())
            .setFooter(`ID de l'utilisateur : ${warnUser.user.id}`)
            .addField("Raison",warnReson)
        
         //On envoie   
        logChannel.send(warnEmbed)
    }
    else{
        message.channel.send(`${bot.config.emojis.success} - ${warnUser} a été warn pour :\n\`${warnReson}\``)
    }
}

module.exports.help = MESSAGES.COMMANDS.MODE.WARN;