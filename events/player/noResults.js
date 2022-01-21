module.exports = (client, message, query) => {
    message.channel.send(`${client.emotes.error} - Il n'y a pas de résultat pour votre recherche ${query} !`);
};