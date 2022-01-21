const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args) =>{

    if (!bot.player.getQueue(message)) return message.channel.send(`${bot.config.emojis.error} - Aucune musique n'est lancée !`);

        const track = bot.player.nowPlaying(message);
        const filters = [];

        Object.keys(bot.player.getQueue(message).filters).forEach((filterName) => bot.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'RED',
                author: { name: track.title },
                fields: [
                    { name: 'Auteur', value: track.author, inline: true },
                    { name: 'Demandé par', value: track.requestedBy.username, inline: true },
                    { name: 'Venu d une playliste', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                    { name: 'Views', value: track.views, inline: true },
                    { name: 'Duration', value: track.duration, inline: true },
                    { name: 'Filtre activé', value: filters.length + '/' + bot.config.filters.length, inline: true },

                    { name: 'Volume', value: bot.player.getQueue(message).volume, inline: true },
                    { name: 'Répétition', value: bot.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
                    { name: 'En pause', value: bot.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },

                    { name: 'Temps', value: bot.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
};

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MUSIC.PLAYING;