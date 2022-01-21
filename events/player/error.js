module.exports = (client, error, message) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} - Il n'y a pas de musique en cours !`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - Vous n'êtes pas connectée au channel !`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} - Je ne peux pas rejoindre le channel vérifier les permission !`);
            break;
        default:
            message.channel.send(`${client.emotes.error} - UwU ... Error : ${error}`);
    };
};
