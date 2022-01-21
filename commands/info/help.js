const { MessageEmbed } = require("discord.js");
const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot, message, args, settings) => {
    if (!args.length) {
        let count = 2;

        //Création de l'embed
        const embed = new MessageEmbed()
            .setColor(bot.config.color.bot)
            .setTitle(``)
            .setTimestamp()

        let desc = `${bot.config.name} est une bot Discord multiguild.Vous pouvez configurer ${bot.config.name} sur [https://jali.xyz/](https://jali.xyz/)\nPour plus d'information sur chaque commande faites \`${settings.guiPrefix}help <command_name>\` \n En cas d'oublis du prefix de votree serveur faites \`prefix?\`\n\n**Utilisé les emodjis pour chager de pages**\n`;


        //Boucle sur les catégorie disponible 

        if (bot.checkRole(message.member)) {
            desc += `**Page ${count}** : ⛔ - ADMIN - ⛔\n`;
            count ++;
        }

        desc += `**Page ${count}** : ℹ️ - INFORMATION - ℹ️\n`;
        count ++;
        
        if (settings.guiCatFun) {
            desc += `**Page ${count}** : 👾 - FUN - 👾\n`;
            count ++;
        }
        if (settings.guiCatModeration) {
            desc += `**Page ${count}** : 👮 - MODÉRATION - 👮\n`;
            count ++;
        }
        if (settings.guiCatMusic) {
            desc += `**Page ${count}** : 🎵 - MUSIQUE - 🎵\n`;
            count ++;
        }
        if (settings.guiCatPoll) {
            desc += `**Page ${count}** : 📄 - QUESTIONNAIRE - 📄\n`;
            count ++;
        }
        if (settings.guiCatRole) {
            desc += `**Page ${count}** : 🔘 - ROLE REACTION - 🔘\n`;
            count ++;
        }
        if (settings.guiCatUtils) {
            desc += `**Page ${count}** : 🔨 - UTILITAIRE - 🔨\n`;
            count ++;
        }
        if (settings.guiPersonnel) {
            desc += `**Page ${count}** : 🪐 - COMMANDE PERSONALISÉE - 💫\n `;
            count ++;
        }


        //On ajoute la description et le footer
        embed.setDescription(desc)
            .setFooter(`Help page 1/${count - 1}`)

        //On envoie
        const send = await message.channel.send(embed)


        //On répond avec les réactions
        await send.react('◀️');
        await send.react('▶️');

    }
    //Pour les help de commande
    else {
        const command = bot.commands.get(args[0]) || bot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

        const embed = new MessageEmbed()
            .setColor(bot.config.color.bot)
            .setTitle(command.help.name)
            .setTimestamp()
            .addField(`Description`, `${command.help.description}`)
            .addField("Utilisation", command.help.usage ? `${settings.guiPrefix}${command.help.name} ${command.help.usage}` : `${settings.prefix}${command.help.name}`)
        embed.setFooter(`Syntax: <> = required, [] = optional`);
        if (command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true)

        return message.channel.send(embed)
    }
}
module.exports.help = exportsCommandName().MESSAGES.COMMANDS.INFO.HELP;

