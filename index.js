require('dotenv').config()

const { Client, Collection } = require('discord.js');
const { Player } = require('discord-player');
const { loadCommands, loadEvents, loadPlayer } = require("./util/loader");
const { loadCommandName } = require("./util/constants");

const { error } = require("./util/autre")

//Création du bot
const bot = new Client({ disableMentions: 'everyone' });

//On crée les collections
["commands", "aliases", "cooldowns", "userCreatedPolls", "usersMap"].forEach(x => bot[x] = new Collection());

//Config bot
bot.player = new Player(bot,{leaveOnEndCooldown:60_000,leaveOnEmpty: false,leaveOnEmptyCooldown:10_000});
bot.config = require('./config.js');

//Fonction
require("./util/fonction")(bot);

//On charge commandes,events,player
loadCommandName(bot);
loadEvents(bot);
//loadCommands(bot);
loadPlayer(bot);


//Event pour catch les errors
error(bot);

//Connection bot
bot.login(process.env.BOT_TOKEN);