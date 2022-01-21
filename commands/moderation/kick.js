const Discord = require("discord.js");
const {MESSAGES} = require("../../util/constants")

module.exports.run =  async (bot,message,args,settings,settingsUser) => {

    let kickUser = message.mentions.users.first();
    if(!kickUser) return message.channel.send(`${bot.config.emojis.error} -  L'utilisateur n'existe pas`)
    let kickReason = args.join(" ").slice(22) || 'Aucune raison spécifiée';

    //kick
    await message.guild.member(kickUser).kick(kickReason);

    //On supprime les données
    await bot.deleteUser(message.guild,kickUser.id)

    //On lui envoie un message
    await kickUser.send(`Tu as été kick du serveur ${message.guild.name} pour : ${kickReason}. `)

    //On confirme
    message.channel.send(`${bot.config.emojis.success} - ${kickUser} a bien été kick`)
}

module.exports.help = MESSAGES.COMMANDS.MODE.KICK;