const fetch = require('node-fetch');
let commands;

const loadCommandName = async (client) => {
    const response = await fetch(`${client.config.api}/commands`);
    commands = await response.json();
    console.log(commands.MESSAGES.COMMANDS.ADMIN.ADDMONNEY)
}

module.exports = {
    loadCommandName,
    commands,
}