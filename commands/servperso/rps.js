const { MessageEmbed } = require("discord.js");
const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args,settings,settingsUser,queue) => {

    const chooseArr = ["🗻", "📰", "✂"];
    
    //si l argent est activé
    let monney = settingsUser.useCoin
    if(monney<10) return message.channel.send("Vous n'avez pas assez d'argent")
    const embed = new MessageEmbed()
            .setColor(bot.config.color.rdm)
            .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL)
            .setDescription("Clique sur une réaction pour jouer a feuille caillou ciseau")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await bot.promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.reactions.removeAll();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

      async  function getResult  (me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {

                    let coin =Number(monney)+10
                    await bot.updateUserSettings(message.guild, "useCoin", coin, message.author.id)
                    return "Tu es trop fort,je dois m'incliner";
         
            } else if (me === clientChosen) {
                return "Nous somme égau dommage!";
            } else {
                
                let coin =Number(monney)-15
                    await bot.updateUserSettings(message.guild, "useCoin",  coin, message.author.id)
                
                return "C'est qui le patron ici";
            }
        }
}
module.exports.help = exportsCommandName().MESSAGES.COMMANDS.SERVPERSO.RPS;
   
