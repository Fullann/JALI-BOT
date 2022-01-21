const { MessageEmbed } = require("discord.js");

/**
 * Message d'Erreur dans un channel
 * @param {*} bot 
 */
const error = (bot) => {
    process.on('unhandledRejection', error => {
        const embed = new MessageEmbed()
            .setColor(bot.config.color.delete)
            .setTitle(`${bot.emotes.error} - Error`)
            .setDescription(error.message)
            .setTimestamp()

        bot.channels.cache.get(bot.config.channelPerso.channelError).send(embed);

        let today = new Date();
        console.log(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" // "+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()  + " => ");
        console.log(error)
    });
}

module.exports = {
    error,
}