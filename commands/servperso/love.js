const { MessageEmbed } = require("discord.js");
const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args,settings,settingsUser,queue) => {
  
  let person = await bot.getMember(message, args[0]);

  if (!person || message.author.id === person.id) {
      person = message.guild.members.cache
          .filter(m => m.id !== message.author.id)
          .random();
  }

  const love = Math.random() * 100;
  const loveIndex = Math.floor(love / 10);
  const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

  const embed = new MessageEmbed()
      .setColor("#ffb6c1")
      .addField(`☁ **${person.displayName}** aime **${message.member.displayName}** a :`,
      `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

  message.channel.send(embed);
}

module.exports.help = MESSAGES.COMMANDS.SERVPERSO.LOVE;