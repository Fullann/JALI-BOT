const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) => {

    let banUser = message.mentions.members.first();
    if(!banUser) return message.channel.send(`${bot.config.emojis.error} - L'utilisateur n'existe pas`)
    let banReason = args.join(" ").slice(22) || "Pas de raison spécifiée"

    //On envoie en perso
    await banUser.send(`Vous avez été banni de ${message.guild.name} par ${message.author.tag} \n Raison : \`${banReason}\``)

    //On ban
    await message.guild.member(banUser).ban({reason: banReason});

    //On supprime les données
    await bot.deleteUser(message.guild,banUser.id)

    //On répond
    message.channel.send(`${bot.config.emojis.success} - ${banUser.user.tag} a été banni pour :\n\`${banReason}\``)
}

module.exports.help = MESSAGES.COMMANDS.MODE.BAN;