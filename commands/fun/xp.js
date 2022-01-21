const { MESSAGES } = require("../../util/constants")
const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (bot, message, args, settings, settingsUser) => {
    let currentXP = settingsUser.useXp;
    let currentLVL = settingsUser.useNiv;
    const member = await bot.getMember(message, args.join(" "));
    let number = member.user.tag.split('#');
    let ran = 0;
    //Check de a quel position il est
    await bot.getUsersFromGuild(message.guild).then(p => {
        p.sort((a, b) => (a.useXp < b.useXp) ? 1 : -1).forEach(e => {
            ran++;
            //Si c est la bonne personne
            if (member.id === e.idUser) {
                const rank = new canvacord.Rank()
                    .setAvatar(member.user.displayAvatarURL({ format: 'jpg' }))
                    .setCurrentXP(currentXP)
                    .setRequiredXP(Math.floor(Math.pow((currentLVL + 1) / 0.1, 2)))
                    .setLevel(currentLVL)
                    .setRank(ran, "RANK", true)
                    .setStatus("streaming")
                    .setProgressBar("#FFFFFF", "COLOR")
                    .setUsername(member.displayName)
                    .setDiscriminator(number[1])
                    .setBackground("IMAGE", "https://discordapp.com/assets/fd91131ea693096d6be5e8aa99d18f9e.jpg")

                rank.build()
                    .then(data => {
                        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                        message.channel.send(attachment);
                    });
            }
        })
    });
}
module.exports.help = MESSAGES.COMMANDS.FUN.XP;