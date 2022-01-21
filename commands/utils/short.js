const {MESSAGES} = require("../../util/constants")
const shorten = require('isgd');

module.exports.run = async (client,message,args) =>{

    shorten.shorten(args[0], function(res) {
        if (res.startsWith('Error:')) return message.channel.send(`${bot.config.emojis.error} - Veuilliez entrer un URL valide`);
        message.channel.send(`**<${res}>**`);

    })
}

module.exports.help = MESSAGES.COMMANDS.UTILS.SHORT;