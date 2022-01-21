const Discord = require('discord.js');
const {exportsCommandName} = require("../../util/loader")
const randomDice = () => Math.floor(Math.random() *6) + 1;

module.exports.run = async (client,message,args,settings,settingsUser) => {

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Lencement de dés")
    .setThumbnail("https://toutpourlejeu.com/1409-large_default/de-a-jouer-classique-16-mm-points.jpg")
    .addFields(
        {name:"Dés 1", value: randomDice(), inline: true},
        {name:"Dés 2", value: randomDice(), inline: true},
        {name:"Dés 3", value: randomDice(), inline: true},
        {name:"Dés 4", value: randomDice(), inline: true},
        {name:"Dés 5", value: randomDice(), inline: true},
        {name:"Dés 6", value: randomDice(), inline: true}
    );
    embed.addField("Total",embed.fields.reduce((total, obj) => parseInt(obj.value) + total,0));
    message.channel.send(embed)
    
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.SERVPERSO.DICES;