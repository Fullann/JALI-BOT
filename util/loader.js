const fs = require('fs');
const { loadCommandName } = require("./constants");
let commands = null;

//On charge tous les events dans le client
const loadEvents = (client, dir = "./events/") => {
  //On regarde dans chaque dossier
  fs.readdirSync(dir).forEach(dirs => {
    const events = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
    for (const event of events) {
      const getEventName = require(`../${dir}/${dirs}/${event}`);
      const eventName = event.split(".")[0];
      client.on(eventName, getEventName.bind(null, client));
    };
  });
}

//On charge tous les commandes dans le client
const loadCommands = (client, dir = "./commands/") => {
  loadCommandName(client, function (json) {
    commands = json;
    //On regarde dans chaque dossier
    fs.readdirSync(dir).forEach(dirs => {
      const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
      for (const file of commands) {
        const getFileName = require(`../${dir}/${dirs}/${file}`);
        const cmdName = getFileName.help.name;
        client.commands.set(cmdName, getFileName);
        getFileName.help.aliases.forEach(alias => {
          client.aliases.set(alias, cmdName);
        });
      };
    });
  });

}

//On charge tous les events du player dans le client
const loadPlayer = (client, dir = "./events/player") => {
  const player = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  for (const file of player) {
    const event = require(`../${dir}/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
  };
}

function exportsCommandName() {
  return commands;
}

module.exports = {
  loadEvents,
  loadCommands,
  loadPlayer,
  exportsCommandName,
}