const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{

        if (!bot.player.getQueue(message)) return message.channel.send(`${bot.emotes.error} - Aucune musique n'est lancée !`);

        const filtersStatuses = [[], []];

        bot.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (bot.player.getQueue(message).filters[filterName] ? bot.emotes.success : bot.emotes.off));
        });

        message.channel.send({
            embed: {
                color: 'ORANGE',
                fields: [
                    { name: 'Filters', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description: `Liste de tous les filtres mis ou pas sur votre musique.\n Faite \`${bot.config.prefix}filter\` pour en ajouter.`,
            },
        });
};

module.exports.help = MESSAGES.COMMANDS.MUSIC.WFILTER;