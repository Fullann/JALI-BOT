module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send(`${client.emotes.success} - La recherche a été annulée **annulée** !`);
    } 
    else message.channel.send(`${client.emotes.error} - Vous devez mettre un chiffre valide entre **1** and **${tracks.length}** !`);
};