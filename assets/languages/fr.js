const languageData = {
    ADD_COINS_SUCCESS_ADMIN : (bot,coinToAdd,user)=> `${bot.emotes.success} - Vous avez ajouter ${coinToAdd} coins a ${user}.`,
    ADD_XP_SUCCESS : (bot,xp,user)=> `${bot.emotes.success} - Vous avez ajouter ${xp} xp a ${user}.`,
    DAILY_SUCCESS : (bot,coins) => `${bot.emotes.success} - Tu as reçu ${coins} pieces.`,
    LEADERBOARD_TITLE : (i,message) => `Top ${i} du serveur ${message.guild.name}`,
    ADD_COINS_SUCCESS : (bot,message,args,user) => `${bot.emotes.success} - ${message.author} a donné ${args[1]} coins à ${user} .`,
    SEND_MP : (bot) => `${bot.emotes.success} - Message envoyée en mp`,

    /*CATEGORIE_COMMANDES*/
    CATEGORIE_ADMIN : "⛔ - ADMIN - ⛔",
    CATEGORIE_INFO : "ℹ️ - INFORMATION - ℹ️",
    CATEGORIE_CONFIG : "📠 - CONFIGURATION - 📠",
    CATEGORIE_FUN : "👾 - FUN - 👾",
    CATEGORIE_MODERATION : "👮 - MODÉRATION - 👮",
    CATEGORIE_MUSIC : "🎵 - MUSIQUE - 🎵",
    CATEGORIE_QUSTION : "📄 - QUESTIONNAIRE - 📄",
    CATEGORIE_REACTION : "🔘 - ROLE REACTION - 🔘",
    CATEGORIE_UTILS : "🔨 - UTILITAIRE - 🔨",
    CATEGORIE_PERSO : "🪐 - COMMANDE PERSONALISÉE - 💫",
    /*MSG_ERROR*/
    NO_ACCOUNT : (bot,message) => `${bot.emotes.error} - Cette personne n'a pas encore crée de compte ${bot.config.name} pour le serveur ${message.guild.name}`,
    NOT_ENOUGH_MONEY : (bot) => `${bot.emotes.error} - Tu n'as pas assez d'argent`,
    TIME_TO_WAITE : (bot,cdTime) => `${bot.emotes.time} - Il reste ${Math.floor(cdTime / (1000 * 60 * 60) % 24)} hrs, ${Math.floor(cdTime / (1000 * 60) % 60)}min, ${Math.floor(cdTime / (1000) % 60)}sec avant de pouvoir avoir de l'argent`,
    NO_AMOUNT:(bot) => `${bot.emotes.error} - Il manque l'argent à ajouter`,
    NO_XP:(bot) => `${bot.emotes.error} - Il manque le nombre d'xp`,
    /*POKEMON*/
    POKEMON_TYPE : "Type",
    POKEMON_WEIGHT : "Poid",
    POKEMON_XP : "Expérience de base",
    NO_POKEMON : (bot,pokemon) => `${bot.emotes.error} - ${pokemon} n'a pas été trouvé.`,
    /*BOT_INFO*/
    BOT_TITLE : (bot) => `Information sur ${bot.config.name}`,
    BOT_ABRE : 'Abréviation',
    BOT_CREAT_AT : 'Créé le',
    BOT_AUTOR : "Auteur",
    BOT_VERSION : "Version",
    BOT_MEMORY : 'Mémoire',
    BOT_ADD : 'Ajouter',
    /*GUILD_INFO*/
    GUILD_TITLE : (guild) => `Information sur le serveur ${guild.name}`,
    GUILD_DESC: "Role disponible(s) : ",
    GUILD_FIELD_TITLE : "Plus d'information :",
    GUILD_FIELD_CONTENT : (bot,prefix,guild,message) => `**-  Votre prefixe** :  ${prefix}
    **- Guild Owner** : ${guild.owner.user.tag} 
    **- Crée le **: ${bot.formatDate(guild.createdAt)}
    **- Vous avez rejoint le **: ${bot.formatDate(message.member.joinedAt)}
    ** - Nombre total de membres **: ${guild.memberCount}
    **- Nombre de bot **: ${guild.members.cache.filter(member => member.user.bot).size}
    **- Nombre de channel **: ${guild.channels.cache.size}`,
    /*HELP*/
    HELP_TITLE: (bot) => `** ${bot.config.name} Help**`,
};

const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(...args);
    else return translation;
};

module.exports = {translate};