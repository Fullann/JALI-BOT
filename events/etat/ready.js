module.exports = (bot) => {
    console.log(`${bot.user.username} est en ligne !`);
    let activity = [`Merci d'avoir choisi ${bot.config.name}`, `sur ${bot.guilds.cache.size.toString()} serveurs`], i = 0;

    setInterval(() => bot.user.setPresence({ activity: { name: `${activity[i++ % activity.length]}`, type: 'WATCHING', status: 'online' } }), 5000)
    bot.channels.cache.get(bot.config.channelPerso.channelStart).send(`${bot.config.name} est opérationnels`);
}