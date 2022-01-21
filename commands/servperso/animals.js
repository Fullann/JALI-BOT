const Discord = require('discord.js');
const fetch = require('node-fetch');
const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args,settings,settingsUser,queue) => {
  

  const embed = new Discord.MessageEmbed()
  .setTitle("Animals")
  .addFields(
    {name:"🦊", value: "Image de renards", inline: true},
    {name:"🐱", value: "Image de chats", inline: true},
    {name:"🐶", value: "Image de chiens", inline: true},
    )
  .setColor("#4105e8")

  let send = await message.channel.send(embed)

await send.react('🦊');
await send.react('🐱');
await send.react('🐶');


let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
let reaction = (await send.awaitReactions(reactionFilter, { max: 1 })).first();

if(reaction.emoji.name === '🐱') {
  message.channel.bulkDelete(2, true)
  const cat = await fetch("http://aws.random.cat/meow")
  .then(res =>res.json())
  .then(json => json.file);

  const embed = new Discord.MessageEmbed()
    .setImage(cat)
    .setColor("#4105e8")

    message.channel.send(embed)
  }
else if(reaction.emoji.name === '🐶') {
  message.channel.bulkDelete(2, true)
    const dog = await fetch("https://dog.ceo/api/breeds/image/random")
    .then(res =>res.json())
    .then(json => json.message);

    const embed = new Discord.MessageEmbed()
      .setImage(dog)
      .setColor("#4105e8")

      message.channel.send(embed)
  }
else if(reaction.emoji.name === '🦊') {
  message.channel.bulkDelete(2, true)
  const fox = await fetch("https://randomfox.ca/floof/")
  .then(res =>res.json())
  .then(json => json.image);

  const embed = new Discord.MessageEmbed()
    .setImage(fox)
    .setColor("#4105e8")

    message.channel.send(embed)
  }
}

module.exports.help = MESSAGES.COMMANDS.SERVPERSO.ANIMALS;