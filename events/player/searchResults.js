module.exports = (client, message, query, tracks) => {
    message.channel.send({
        embed: {
            color: 'BLUE',
            author: { name: `Voici les résultats pour la recherche de : ${query}` },
            footer: { text: 'Tapper le chiffre de votre musique ou **cancel** pour annuler' },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    });
};