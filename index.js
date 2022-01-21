require('dotenv').config()

const { Client, Collection } = require('discord.js');
const { Player } = require('discord-player');
const { loadCommands, loadEvents, loadPlayer } = require("./util/loader");
const { error } = require("./util/autre")

//Création du bot
const bot = new Client({ disableMentions: 'everyone' });

//On crée les collections
["commands", "aliases", "cooldowns", "userCreatedPolls", "usersMap"].forEach(x => bot[x] = new Collection());

//Config bot
bot.player = new Player(bot,{leaveOnEndCooldown:60_000,leaveOnEmpty: false,leaveOnEmptyCooldown:10_000});
bot.config = require('./config.js');
bot.emotes = bot.config.emojis;
bot.filters = bot.config.filters;
bot.commandsNumber = 0;

//Fonction
require("./util/fonction")(bot);

//Connection db
require("./util/connection")(bot);

//On charge commandes,events,player
loadEvents(bot);
loadCommands(bot);
loadPlayer(bot);

//Event pour catch les errors
error(bot);

//Connection bot
bot.login(process.env.BOT_TOKEN);