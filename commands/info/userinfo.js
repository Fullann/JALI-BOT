const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const {exportsCommandName} = require("../../util/loader");

module.exports.run = async (bot, message, args, settings, User, translate) => {

    const member = await bot.getMember(message, args.join(" "));

    const settingsUser = await bot.getUser(message.guild, member.id);
    // Member variables
    const joined = await bot.formatDate(member.joinedAt);
    const roles = member.roles.cache.map(role => role.name).join('/ ');

    let game = (member.presence.activities[0] != undefined ? member.presence.activities[0].name : 'Pas entrain de jouer');

    // User variables
    const created = await bot.formatDate(member.user.createdAt);
    const embed = new MessageEmbed()
        .setFooter(member.displayName, member.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL())
        .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

        .addField('User information:', stripIndents`**- ID:** ${member.user.id}
            **- Username**: ${member.user.username}
            **- Tag**: ${member.user.tag}
            **- Crée le**: ${created}
            **-Statut**: ${member.presence.status.toUpperCase()}
            **-Jeux**: ${game}`, true)

        .addField('Member information:', stripIndents`**- Display name:** ${member.displayName}
            **- Rejoint le :** ${joined}
            **- Roles:** ${roles}
            **- Voice Channel :** ${member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : 'Aucun'}`, false)

        .setTimestamp()

    if (settingsUser) {
        embed.addField('Member information:', ` **- Monney :** ${settingsUser.useCoin == null ? "0" : settingsUser.useCoin}
        **- Xp :** ${settingsUser.useXp == null ? "0" : settingsUser.useXp}
        **- Niveau :** ${settingsUser.useNiv == null ? "0" : settingsUser.useNiv}
        **- Warn reçu: **${settingsUser.useWarn == null ? "0" : settingsUser.useWarn}`, true)
    }

    if (member.user.presence.game)
        embed.addField('Entrain de jouer', stripIndents`** Name:** ${member.user.presence.game.name}`);

    //Envoie en mp
    message.author.send(embed);

    //Envoie dans la guild
    message.channel.send(translate("SEND_MP",bot));
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.INFO.USERINFO;