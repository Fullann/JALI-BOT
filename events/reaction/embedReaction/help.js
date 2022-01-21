const { MessageEmbed } = require('discord.js');

const help = async (bot, message, _emoji, settings, user) => {
    const pageActu = message.embeds[0].footer.text.split("/")[0].split("page ")[1];
    const pageTotal = message.embeds[0].footer.text.split("/")[1];
    let desc = "";
    let descriptions = [];
    let titels = [];
    let nextPage = 0;
    let count = 1;

    //table des matieres
    titels.push(`**${bot.config.name} Help**`);
    descriptions.push(desc);
    //Si admin
    if (bot.checkRole(user)) {
        titels.push("⛔ - ADMIN - ⛔");
        bot.commands.filter(cat => cat.help.category === "admin").map(cmd => desc += `\`${cmd.help.name} ${cmd.help.aliases.join(', ')}\` : ${cmd.help.description} \n\n`)
        descriptions.push(desc);
    }
    //pour les infos
    desc = ""
    titels.push("ℹ️ - INFORMATION - ℹ️");
    bot.commands.filter(cat => cat.help.category === "info").map(cmd => desc += `\`${cmd.help.name} ${cmd.help.aliases.join(', ')}\` : ${cmd.help.description} \n\n`)
    descriptions.push(desc);

    //pour fun
    if (settings.guiCatFun) {
        desc = ""
        titels.push("👾 - FUN - 👾");
        bot.commands.filter(cat => cat.help.category === "fun").map(cmd => desc += `\`${cmd.help.name} ${cmd.help.aliases.join(', ')}\` : ${cmd.help.description} \n\n`)
        descriptions.push(desc);
    }
    //pour la modération
    if (settings.guiCatModeration) {
        desc = ""
        titels.push("👮 - MODÉRATION - 👮");
        bot.commands.filter(cat => cat.help.category === "moderation").map(cmd => desc += `\`${cmd.help.name} ${cmd.help.aliases.join(', ')}\` : ${cmd.help.description} \n\n`)
        descriptions.push(desc);
    }
    //pour la musique
    if (settings.guiCatMusic) {
        desc = ""
        titels.push("🎵 - MUSIQUE - 🎵");
        bot.commands.filter(cat => cat.help.category === "music").map(cmd => desc += `\`${cmd.help.name} ${cmd.help.aliases.join(', ')}\` : ${cmd.help.description} \n\n`)
        descriptions.push(desc);
    }
    if (settings.guiCatPoll) {
        desc = ""
        titels.push("📄 - QUESTIONNAIRE - 📄");
        bot.commands.filter(cat => cat.help.category === "question").map(cmd => desc += `\`${cmd.help.name} ${cmd.help.aliases.join(', ')}\` : ${cmd.help.description} \n\n`)
        descriptions.push(desc);
    }
    //pour les roles réactions
    if (settings.guiCatRole) {
        desc = ""
        titels.push("🔘 - ROLE REACTION - 🔘");
        bot.commands.filter(cat => cat.help.category === "role").map(cmd => desc += `\`${cmd.help.name} ${cmd.help.aliases.join(', ')}\` : ${cmd.help.description} \n\n`)
        descriptions.push(desc);
    }
    //pour les utils
    if (settings.guiCatUtils) {
        desc = ""
        titels.push("🔨 - UTILITAIRE - 🔨");
        bot.commands.filter(cat => cat.help.category === "utils").map(cmd => desc += `\`${cmd.help.name} ${cmd.help.aliases.join(', ')}\` : ${cmd.help.description} \n\n`)
        descriptions.push(desc);
    }
    //Si servperso
    if (settings.guiPersonnel) {
        desc = ""
        titels.push("🪐 - COMMANDE PERSONALISÉE - 💫");
        bot.commands.filter(cat => cat.help.category === "servperso").map(cmd => desc += `\`${cmd.help.name} ${cmd.help.aliases.join(', ')}\` : ${cmd.help.description} \n\n`)
        descriptions.push(desc);
    }

    if (_emoji.name === '◀️') {
        if (pageActu - 1 <= 0) return;
        //On set la prochaine position
        nextPage = Number(pageActu) - 1;

    }
    if (_emoji.name === '▶️') {
        if (pageActu >= descriptions.length) return;
        //On set la prochaine position
        nextPage = Number(pageActu) + 1;
    }

    //Si on doit afficher la page de help
    if (titels[nextPage - 1].includes("Help")) {
        desc = `${bot.config.name} est une bot Discord multiguild.Vous pouvez configurer ${bot.config.name} sur [https://jali.xyz/](https://jali.xyz/)\nPour plus d'information sur chaque commande faites \`${settings.prefix}help <command_name>\` \n En cas d'oublis du prefix de votree serveur faites \`prefix?\`\n\n**Utilisé les emodjis pour chager de pages**\n`;
        //Boucle sur les catégorie disponible 

        if (bot.checkRole(message.member)) {
            desc += `**Page ${count}** : ⛔ - ADMIN - ⛔\n`;
            count++;
        }
        desc += `**Page ${count}** : ℹ️ - INFORMATION - ℹ️\n`;
        count++;
        if (settings.guiCatFun) {
            desc += `**Page ${count}** : 👾 - FUN - 👾\n`;
            count++;
        }
        if (settings.guiCatModeration) {
            desc += `**Page ${count}** : 👮 - MODÉRATION - 👮\n`;
            count++;
        }
        if (settings.guiCatMusic) {
            desc += `**Page ${count}** : 🎵 - MUSIQUE - 🎵\n`;
            count++;
        }
        if (settings.guiCatPoll) {
            desc += `**Page ${count}** : 📄 - QUESTIONNAIRE - 📄\n`;
            count++;
        }
        if (settings.guiCatRole) {
            desc += `**Page ${count}** : 🔘 - ROLE REACTION - 🔘\n`;
            count++;
        }
        if (settings.guiCatUtils) {
            desc += `**Page ${count}** : 🔨 - UTILITAIRE - 🔨\n`;
            count++;
        }
        if (settings.guiPersonnel) {
            desc += `**Page ${count}** : 🪐 - COMMANDE PERSONALISÉE - 💫\n `;
            count++;
        }
        descriptions[0] = desc;
    }

    //Création de l embed
    const embed = new MessageEmbed()
        .setColor(bot.config.color.bot)
        .setTitle(titels[nextPage - 1])
        .setTimestamp()
        .setFooter(`Help page ${nextPage}/${pageTotal}`)
        .setDescription(descriptions[nextPage - 1]);


    //On envoie
    message.edit(embed);
}
module.exports = {
    help,
}