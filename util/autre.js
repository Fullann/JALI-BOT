const { MessageEmbed } = require("discord.js");

/**
 * Message d'Erreur dans un channel
 * @param {*} bot 
 */
const error = (bot) => {
    process.on('unhandledRejection', error => {
        const today = new Date();
        console.log(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" // "+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()  + " => ");
        console.log(error)

        const embed = new MessageEmbed()
            .setColor(bot.config.color.delete)
            .setTitle(`${bot.config.emojis.error} - Error`)
            .setDescription(error.message)
            .setTimestamp()
            
        console.log(bot.channels.cache.get(bot.config.channelPerso.channelError))
        bot.channels.cache.get(bot.config.channelPerso.channelError).send(embed);

        
    });
}

module.exports = {
    error,
}