const { MessageEmbed} = require("discord.js");
const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot,message,args,settings) => {
        if (args[0]) {
            return getCMD(bot, message, args[0]);
        } 
        else {
            let helpEmbed = new MessageEmbed()
            .setTitle("Commande du Bot")
            .addField("n'oublier pas votre prefixe", `${settings.guiPrefix}`)
            .setColor("RANDOM")
            .addField("pour les info pour chaque commande faite:",`${settings.guiPrefix}help (nom de de la commande)`)
            .addField("Commandes info","[info],[help],[see]")
            .addField("Commandes configuration","[config],[start],[ping]")
            .addField("Commandes management","[kick],[ban],[report],[mute],[addrole],[rrole],[clear],[warn]")
            .addField("Commandes question","[say],[poll]")
            .addField("Commandes fun","[ask],[math],[animals],[rps],[love],[insta],[meme],[pay]")
            .addField("Commandes musique","[play],[playing],[pause],[resume],[queue],[skip],[stop],[volume]")
            message.channel.send(helpEmbed) 
        }
    }
   
    function getCMD(bot, message, input) {
        const embed = new MessageEmbed()
    
        const cmd = bot.commands.get(input.toLowerCase());
        
        let info = `Pas d'information trouvée pour cette commande **${input.toLowerCase()}**`;
    
        if (!cmd) {
            return message.channel.send(embed.setColor("RED").setDescription(info));
        }
    
        if (cmd.help.name) info = `**Command name**: ${cmd.help.name}`;
        if (cmd.help.aliases) info += `\n**Aliases**: ${cmd.help.aliases.map(a => `\`${a}\``).join(", ")}`;
        if (cmd.help.description) info += `\n**Description**: ${cmd.help.description}`;
        if (cmd.help.usage) {
            info += `\n**Usage**: ${cmd.help.usage}`;
            embed.setFooter(`Syntax: <> = required, [] = optional`);
        }
    
        return message.channel.send(embed.setColor("GREEN").setDescription(info));
    }  

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.ADMIN.HELP2;