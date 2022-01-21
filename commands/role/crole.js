const {exportsCommandName} = require("../../util/loader")
const he = require('he');

module.exports.run = async (bot,message,args) =>{
    let roleList = await bot.getListRole(message.guild,args[0]);
    if(roleList) return message.channel.send(`${bot.config.emojis.error} - Il existe déja un message réaction avec ce nom`)
    /**
     * Création de la liste de role
     */
    await bot.emit("settingsListRoles", message.guild,String(args[0]));
    message.channel.send(`Veuilliez envoyer sous cette forme(@Role/💯) puis tapper \`done\` une fois fini`)

      let filter = m => {
        if(m.author.id === message.author.id) {
            if(m.content.toLowerCase() === 'done') collector.stop();
            else return true;
        }
        else return false;
    }
    let collector = message.channel.createMessageCollector(filter, { maxMatches: 10 });
    let listeRoles = await getOptions(collector);

    for (let i = 0; i < listeRoles.length; i++) {
        let rolel = listeRoles[i].split('/');
        if(rolel.length == 2){
            const newRole = {
                idRole: rolel[0],
                emodji: he.encode(rolel[1])
              };
              let role = await bot.creatRole(newRole);
              await bot.updateListRole(message.guild,args[0], { $push:{ listRole: role }})
        }
        else{
            message.channel.send(`${bot.config.emojis.error} - Le message ${rolel} n'${i} n'est pas sous le bon format.\nIl ne sera pas pris en compte.`)
        }
    }
    message.channel.send(`${bot.config.emojis.success} - votre message réaction a été enregistrer`)
     
    
    function getOptions(collector) {
        return new Promise((resolve, reject) => {
            collector.on('end', collected => resolve(collected.map(m => m.content.toLowerCase())));
        });
    }
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.ROLE.CREATEROLE;  