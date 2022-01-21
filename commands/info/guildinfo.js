const Discord = require("discord.js");
const { MESSAGES } = require("../../util/constants")

module.exports.run = async (bot, message, args, settings, settingsUser, translate) => {

    const { guild } = message;

    let servEmbed = new Discord.MessageEmbed()
        .setTitle(translate("GUILD_TITLE",guild))
        .setColor(bot.config.color.medium)
        .setThumbnail(guild.iconURL())
        .setTimestamp()
        .setFooter(`ID : ${guild.id}`)
        .addField(translate("GUILD_FIELD_TITLE"),translate("GUILD_FIELD_CONTENT",bot,settings.guiPrefix,guild,message))
        .setDescription(`${translate("GUILD_DESC")} \n${guild.roles.cache.map(role => role.name).join(' ')}`);

    //Pour récupe les status des personnes
    /*message.guild.members.fetch().then(fetchAll =>{
        const offline = fetchAll.filter(m => m.presence.status === 'offline');
        const online = fetchAll.filter(m => m.presence.status === 'online');
        const dnd = fetchAll.filter(m => m.presence.status === 'dnd');
        message.channel.send("Membre",`${online.size} en ligne, ${offline.size} hors-ligne et ${dnd.size} occupés.`)
    });*/

    //Envoie en mp
    message.author.send(servEmbed);

    //Envoie dans la guild
    message.channel.send(translate("SEND_MP",bot));
}

module.exports.help = MESSAGES.COMMANDS.INFO.GUILDINFO;

