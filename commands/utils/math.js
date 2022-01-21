const Discord = require('discord.js');
const math = require("mathjs")
const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args,settings,settingsUser,queue) => {

    if(!args[0]) return message.channel.send(`${bot.config.emojis.error} - Entrez des chiffre`)
        let calcul;
    
        try{
            calcul = math.evaluate (args)
        }
        catch (e){
            return message.channel.send(`${bot.config.emojis.error} - Veuiliez entrer des chiffres valide`)
        }
    
        let mathEmbed =new Discord.MessageEmbed()
        .setTitle(`Réponse au calcul de ${message.author.username}`)
        .setColor("#00ffc3")
        .addField("Chiffres",args)
        .addField("Résultat", calcul)
    
        message.channel.send(mathEmbed);
}

module.exports.help = MESSAGES.COMMANDS.UTILS.MATH;
    
