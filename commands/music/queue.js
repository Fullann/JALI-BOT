const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args) =>{

        const queue = bot.player.getQueue(message);

        if (!bot.player.getQueue(message)) return message.channel.send(`${bot.config.emojis.error} - Aucun son n'est lancée acctuellement !`);

        let totalTime = 0;
        message.channel.send(`**Liste du serveur - ${message.guild.name} ${bot.config.emojis.queue} ${bot.player.getQueue(message).loopMode ? '(en boucle)' : ''}**\nActuelle : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
            totalTime += parseInt(track.duration);
            return `**#${i + 1}** - ${track.title} | ${track.author} (demandé par : ${track.requestedBy.username})`
        }).slice(0, 10).join('\n') + `\n\n${queue.tracks.length > 10 ? `Et **${queue.tracks.length - 10}** autre musique...` : `Dans la liste **${queue.tracks.length}** musique(s) - Temps total **${totalTime}** minutes`}`));
};

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MUSIC.QUEUE;