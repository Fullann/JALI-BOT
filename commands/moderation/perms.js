const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) =>{
    let perms = message.member.permissions;
    let perm = perms.serialize()
    let messageReturn = "```Permission de "+ message.member.displayName+"\n\n";
    for(let i in perm){
        let reaction = perm[i] ? "✅" : "❌"
        messageReturn += `${i} : ${reaction}\n`
    }
    messageReturn += "```"
     message.channel.send(messageReturn)
}

module.exports.help = MESSAGES.COMMANDS.MODE.PERMS;   