module.exports = (client, message, track) => {
    message.channel.send(`${client.emotes.music} - Début de  ${track.title} dans ${message.member.voice.channel.name} ...`);
};