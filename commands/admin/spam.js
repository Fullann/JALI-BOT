const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (client,message,args) =>{
    for (i = 0; i < args[0]; i++) {
        await message.channel.messages.fetch({ limit: args[0] }).then(
            setTimeout(() => message.channel.send(`${args[1]}`), 1000 * i))
    }
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.ADMIN.SPAM; 