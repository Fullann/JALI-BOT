const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants")

module.exports.run = (client, message, args) => {
    message.delete();

    const roleColor = message.guild.me.roles.highest.color;

    if (args[0] === "embed") {
        const embed = new MessageEmbed()
            .setDescription(args.slice(1).join(" "))
            .setColor(roleColor === "#000000" ? "#ffffff" : roleColor);

        message.channel.send(embed);
    } else {
        message.channel.send(args.join(" "));
    }
}

module.exports.help = MESSAGES.COMMANDS.QUEST.SAY;
