module.exports = (client, message, queue, playlist) => {
    message.channel.send(`${client.emotes.music} - ${playlist.title} a été ajouté a la liste (**${playlist.tracks.length}** musiques) !`);
};