module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - La musique c'est arrêtée car la liste est finie !`);
};