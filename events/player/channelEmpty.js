module.exports = (client, message) => {
    message.channel.send(`${client.emotes.error} - La musique c'est arrêtée car il n'y avait plus assez de personne dans le channel !`);
};