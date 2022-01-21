const Discord = require('discord.js');
const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args,settings,settingsUser,translate) => {
    let i = 0;
    const embed = new Discord.MessageEmbed()
    .setColor(bot.config.color.rdm)
    
    //On boucle sur le nombre de personne
    await bot.getUsersFromGuild(message.guild).then(p=>{
        p.sort((a,b)=>(a.useCoin<b.useCoin) ? 1 : -1).splice(0,10).forEach(e=>{
            i++;
            embed.addField(bot.users.cache.get( e.idUser).username,`${e.useCoin} xp`)
        })
    });

    //On ajoute le titre
    embed.setTitle(translate("LEADERBOARD_TITLE",i,message))

    //On envoie
    message.channel.send(embed);
}

exports.help = MESSAGES.COMMANDS.FUN.LEADERBOARD;