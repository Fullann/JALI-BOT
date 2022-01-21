const { Collection } = require("discord.js");
const TempChannels = require("discord-temp-channels");

module.exports = async (bot, message) => {

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return bot.emit("dm", message);
  if (message.guild.id == bot.config.guildManage) bot.emit("msgGuild", message);

  //Constantes
  const settings = await bot.getGuild(message.guild);
  const args = message.content.slice(settings.guiPrefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  const settingsUser = await bot.getUser(message.guild, message.author.id);
  const { translate } = require(`../../assets/languages/${settings.guiLanguage}`);



  //Ajout dew l'xp
  if (settings.guiXp) {
    //variable xp
    let addexp = Math.floor(Math.random() * 10) + 1;
    let level = Math.floor(0.1 * Math.sqrt(settingsUser.useXp));

    //ajout xp
    await bot.updateUserSettings(message.guild, "useXp", settingsUser.useXp + addexp, message.author.id);

    //si on passe de niv
    if (settingsUser.useNiv < level) {
      await bot.updateUserSettings(message.guild, "useNiv", level, message.author.id);

      message.channel.send(`Bravo ${message.author},tu es passé niveau ${level}`).then(message => message.delete({ timeout: 5000 }));
    }
  }

  if (settings.guiNoInsult) {
    let blacklisted = ['fdp', 'ntm', 'connard', 'pute', 'putain', 'ta gueule', 'nique', 'salope', 'PD', 'batard', 'putin', 'enfoiré', 'connare', 'fils de pute', 'bâtard', 'bicot', 'conasse', 'couille molle', 'débile', 'ducon', 'dugland', 'enculé', 'fachiste', 'imbécile', 'lavette'];
    let FoundItem = false;

    for (let i in blacklisted) {
      if (message.content.toLocaleLowerCase().includes(blacklisted[i].toLowerCase())) FoundItem = true;
    }

    if (FoundItem) {
      message.delete();
    }
  }

  //Antispam
  if (settings.guiAntiSpam) {
    //Constante
    const LIMIT = 5;
    const TIME = 7000;
    const DIFF = 3000;

    //Créaton du role
    let muteRole = message.guild.roles.cache.find(m => m.name == "muted");
    if (!muteRole) {
      bot.createRoleMute(message);
    }
    //Si le user est dans la map
    if (bot.usersMap.has(message.author.id)) {
      const userData = bot.usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference = message.createdTimestamp - lastMessage.createdTimestamp;
      //On compte les messages
      let msgCount = userData.msgCount;
      if (difference > DIFF) {
        clearTimeout(timer);
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
          bot.usersMap.delete(message.author.id);
        }, TIME);
        bot.usersMap.set(message.author.id, userData);
      }
      else {
        ++msgCount;
        //Si on mute
        if (parseInt(msgCount) === LIMIT) {
          const role = message.guild.roles.cache.get(muteRole.id);
          message.member.roles.add(role);
          message.channel.send(`${bot.config.emojis.off} - ${message.author} a été muté pour spam`);
          //On reset le mute
          setTimeout(() => {
            message.member.roles.remove(role);
            message.channel.send(`${bot.config.emojis.success} - ${message.author} a été n'est plus muté`);
          }, TIME);
        } else {
          userData.msgCount = msgCount;
          bot.usersMap.set(message.author.id, userData);
        }
      }
    }
    //On l'ajoute
    else {
      let fn = setTimeout(() => {
        bot.usersMap.delete(message.author.id);
      }, TIME);
      bot.usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
      });
    }
  }
  //Channel Personnel
  if (settings.guiChannelPerso) {
    if (!settings.guiChannelPersoActive) {
      let cat = message.guild.channels.cache.get(settings.guiCategoryPrivateRoom);

      const tempChannels = new TempChannels(bot);
      const options = {
        childAutoDelete: true,
        childMaxUsers: 10,
        childCategory: cat,
        childBitrate: 8000,
        childFormat: (member, count) => `Channel de ${member.user.username}`
      };
      tempChannels.registerChannel(settings.guiChannelPrivateRoom, options);

      bot.SetPersoChannelOn(message.guild)
    }
  }

  //Oublis du prefix
  if (message.content.toLowerCase() == "prefix?") {
    message.reply(`Votre prefix est \`${settings.guiPrefix}\``)
  }

  //Check du prefix
  if (message.content.indexOf(settings.guiPrefix) !== 0) return;

  //Check de si la commande existe
  if (!command) return;

  //Check de si la commande est en cours de dev
  if (command.help.isDev && !bot.checkRole(message.member)) return message.reply(`${bot.config.emojis.error} - Désolé cette commande n'est pas encore disponible`);

  //Check de si la commande est activée
  if (command.help.isActive && !bot.checkRole(message.member)) return;

  //Check de si il y a besoin d'un argument
  if (command.help.args && !args.length) {
    let replyMessage = `${bot.config.emojis.error} -  (${message.author}) Il manque un argument.`;
    if (command.help.usage) {
      replyMessage += `\nVous devez utiliser cette commande comme ceci :\`${command.help.usage}\`.`;
    }
    return message.channel.send(replyMessage)
  }

  //Check du cooldown
  if (!bot.cooldowns.has(command.help.name)) {
    bot.cooldowns.set(command.help.name, new Collection());
  }
  const timeNow = Date.now();
  const tStamps = bot.cooldowns.get(command.help.name);
  const cdAmout = (command.help.cooldown || 5) * 1000;

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmout;

    if (timeNow < cdExpirationTime) {
      let timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.reply(`${bot.config.emojis.time} - Merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de pouvoir ré-utiliser la commande \`${command.help.name}\`.`)
    }
  }
  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmout);

  //Check de la permissions pour BAN
  if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply(`${bot.config.emojis.error} - Tu n'as pas les permissions pour tapper cette commande.`);

  //Check de la permissions pour MANAGE
  if (command.help.permManage && !message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`${bot.config.emojis.error} - Tu n'as pas les permissions pour tapper cette commande.`);


  //Check si les catégories sont actifs
  if (command.help.category === "fun" && !settings.guiCatFun) return message.author.send(bot.config.message.categorieNotTrue);

  if (command.help.category === "moderation" && !settings.guiCatModeration) return message.author.send(bot.config.message.categorieNotTrue);

  if (command.help.category === "music" && !settings.guiCatMusic) return message.author.send(bot.config.message.categorieNotTrue);

  if (command.help.category === "question" && !settings.guiCatPoll) return message.author.send(bot.config.message.categorieNotTrue);

  if (command.help.category === "role" && !settings.guiCatRole) return message.author.send(bot.config.message.categorieNotTrue);

  if (command.help.category === "utils" && !settings.guiCatUtils) return message.author.send(bot.config.message.categorieNotTrue);
  //Si c est un serveur perso
  if (command.help.category === "servperso" && !settings.guiPersonnel) return;



  //Check de si xp est en on
  if (command.help.xp && settings.guiXp != 1) return message.reply(`${bot.config.emojis.error} - Le système d'expérience n'est pas actif sur ce serveur.`)

  //Check de si monney est en on
  if (command.help.coin && settings.guiCoin != 1) return message.reply(`${bot.config.emojis.error} - Le système d'argent n'est pas actif sur ce serveur.`)

  //Check de si warn est en on
  if (command.help.warn && settings.guiWarn != 1) return message.reply(`${bot.config.emojis.error} - Le système de warn n'est pas actif sur ce serveur.`)

  //Check de la pesonne sur qui c est executer
  if (message.guild.member(message.mentions.users.first())) {
    if (command.help.canBeAffected && message.guild.member(message.mentions.users.first()).hasPermission('BAN_MEMBERS')) return message.reply(`${bot.config.emojis.error} - Tu ne peut pas affecter cette personne avec \`${command.help.name}\``)
  }
  //Check pour la musique
  if (command.help.category === "music") {
    if (!message.member.voice.channel) return message.channel.send(`${bot.config.emojis.error} - Vous n'êtes pas dans un channel vocal`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${bot.config.emojis.error} - Vous n'êtes pas dans le channel vocal de ${bot.config.name} !`);
  }

  //Envoie des variables a la commandes tapée
  command.run(bot, message, args, settings, settingsUser, translate);
};