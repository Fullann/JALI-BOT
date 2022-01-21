module.exports = (bot, guild) => {
	bot.createGuild(guild);
    bot.channels.cache.get(bot.config.channelPerso.channelPerso).send(`New Guild Add {${guild.name}}`);
};
