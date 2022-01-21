const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{

    if (!bot.player.getQueue(message)) return message.channel.send(`${bot.emotes.error} - Aucune musique n'est lancée !`);

        const filterToUpdate = bot.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(`${bot.emotes.error} - Ce filtre n'est pas disponible faite ${bot.config.prefix}lfilter pour avoir la liste de tous les filtres !`);

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = bot.player.getQueue(message).filters[filterToUpdate] ? false : true;

        bot.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`${bot.emotes.music} - Ce filtre a été ajouter.`);
        else message.channel.send(`${bot.emotes.music} - Ce filtre a été enlevé.`);
};
module.exports.help = MESSAGES.COMMANDS.MUSIC.FILTER;