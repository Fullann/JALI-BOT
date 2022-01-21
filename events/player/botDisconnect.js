module.exports = (client, message) => {
    message.channel.send(`${client.emotes.error} - La musique c'est arrêtée et ${client.config.name} va se déconnecter !`);
};