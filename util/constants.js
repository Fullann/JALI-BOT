const fetch = require('node-fetch');

const loadCommandName = (client, callback) => {
    fetch(`${client.config.api}/commands`)
        .then(res => res.json())
        .then(r => callback(r));
}



module.exports = {
    loadCommandName
}