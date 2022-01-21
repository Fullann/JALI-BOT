module.exports = (bot) => {

  /**
   * Load des fonction pour la guild et les user
   */
  require("./database/guild")(bot);
  require("./database/user")(bot);
  //require("./database/role")(bot);

  /**
   * Supression de tous les users et la guild 
   * @param {*} guild 
   */
  bot.deleteAll = (guild) => {
    bot.deletesUser(guild);
    bot.deleteGuild(guild);
  };

  //Pour rps
  bot.promptMessage = async (message, author, time, validReactions) => {

    time *= 1000;

    for (const reaction of validReactions) await message.react(reaction);

    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

    return message
      .awaitReactions(filter, { max: 1, time: time })
      .then(collected => collected.first() && collected.first().emoji.name);
  }

  /**
   * Changement de la date en francais
   * @param {*} date 
   */
  bot.formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR').format(date)
  }


  /**
   * Création du role mute
   * @param {*} message 
   */
  bot.createRoleMute = async (message) => {
    try {
      muteRole = await message.guild.roles.create({
        data: {
          name: 'muted',
          color: '#000',
          permissions: []
        }
      });
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  };

  /**
   * Clean du code pour la commande eval
   * @param {*} client 
   * @param {*} text 
   */
  bot.clean = (client, text) => {
    if (typeof evaled !== 'string') text = require('util').inspect(text, { depth: 0 });

    var t = text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203))
      .replace(/\n/g, '\n' + String.fromCharCode(8203))
      .replace(client.config.token, 'mfa.VkO_2G4Qv3T-- NO TOKEN HERE --')

    return t;
  };

  /**
   * Permet de transformer du text en variable
   * @param {*} mesage 
   * @param {*} member 
   */
  bot.transform = (mesage, member) => {
    if (mesage.includes("{{user}}")) mesage = mesage.replace("{{user}}", member.displayName);
    if (mesage.includes("{{guild}}")) mesage = mesage.replace("{{guild}}", member.guild.name);
    if (mesage.includes("{{id}}")) mesage = mesage.replace("{{id}}", member.id);
    if (mesage.includes("{{guildCount}}")) mesage = mesage.replace("{{guildCount}}", member.guild.memberCount);
    if (mesage.includes("{{guildRegion}}")) mesage = mesage.replace("{{guildRegion}}", member.guild.region);

    return mesage;
  };

  /**
   * Check si la personne a les perm admin sur le bot
   * @param {*} message 
   */
  bot.checkRole = (person) => {
    const guild = bot.guilds.cache.get(bot.config.guildManage);
    const member = guild.members.cache.get(`${person.id}`)
    if (member) {
      const role = member.roles.cache.get(bot.config.roleManage)
      if (role) {
        return true;
      }
    }
    return false;
  };


  bot.permTranslate = (perms) => {
    let t = perms
      .replace("CREATE_INSTANT_INVITE","créer une Invitation" )
      .replace("KICK_MEMBERS","expulser des membres" )
      .replace("BAN_MEMBERS","bannir des membres" )
      .replace("ADMINISTRATOR","administrateur" )
      .replace("MANAGE_CHANNELS","gérer les salons" )
      .replace("MANAGE_GUILD","gérer le serveur" )
      .replace("ADD_REACTIONS","ajouter des réactions" )
      .replace("VIEW_AUDIT_LOG","voir les logs du serveur" )
      .replace("PRIORITY_SPEAKER","voix prioritaire" )
      .replace("STREAM","diffusion" )
      .replace("VIEW_CHANNEL","voir le salon" )
      .replace("SEND_MESSAGES","envoyer des messages" )
      .replace("SEND_TTS_MESSAGES","envoyer des messages tts" )
      .replace("MANAGE_MESSAGES","gérer les messages" )
      .replace("EMBED_LINKS","intégrer des liens" )
      .replace("ATTACH_FILES","joindre des fichiers" )
      .replace("READ_MESSAGE_HISTORY","voir les anciens messages" )
      .replace("MENTION_EVERYONE","mentionner everyone" )
      .replace("USE_EXTERNAL_EMOJIS","utiliser des émojis externes" )
      .replace("VIEW_GUILD_INSIGHTS","voir les connaissance du serveur" )
      .replace("CONNECT","se connecter" )
      .replace("SPEAK","parler" )
      .replace("MUTE_MEMBERS","couper le micro des membres" )
      .replace("DEAFEN_MEMBERS","mettre en sourdine des membres" )
      .replace("MOVE_MEMBERS","déplacer des membres" )
      .replace("USE_VAD","utiliser la dav" )
      .replace("CHANGE_NICKNAME","changer le pseudo" )
      .replace("MANAGE_NICKNAMES","gérer les pseudos" )
      .replace("MANAGE_ROLES","gérer les rôles" )
      .replace("MANAGE_WEBHOOKS","gérer les webhooks" )
      .replace("MANAGE_EMOJIS","gérer les émojis" )
    return t;
  };

  bot.translateCType = (channel) =>{
    let t = channel
    .replace("text","textuel")
    .replace("voice","vocal")
    .replace("category","catégorie")
    .replace("news","nouvelle")
    .replace("store","magasin")
    .replace("dm","privé")
    .replace("unknown","inconnu")

    return t
  }
};