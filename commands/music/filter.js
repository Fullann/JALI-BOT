const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args) =>{

    if (!bot.player.getQueue(message)) return message.channel.send(`${bot.config.emojis.error} - Aucune musique n'est lancée !`);

        const filterToUpdate = bot.config.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(`${bot.config.emojis.error} - Ce filtre n'est pas disponible faite ${bot.config.prefix}lfilter pour avoir la liste de tous les filtres !`);

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = bot.player.getQueue(message).filters[filterToUpdate] ? false : true;

        bot.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`${bot.config.emojis.music} - Ce filtre a été ajouter.`);
        else message.channel.send(`${bot.config.emojis.music} - Ce filtre a été enlevé.`);
};
module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MUSIC.FILTER;