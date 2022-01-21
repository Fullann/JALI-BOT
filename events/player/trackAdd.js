module.exports = (client, message, queue, track) => {
    message.channel.send(`${client.emotes.music} - ${track.title} a été ajouter a la liste !`);
};