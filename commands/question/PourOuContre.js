const {exportsCommandName} = require("../../util/loader")
const {MessageEmbed} = require("discord.js")

module.exports.run = async (bot,message,args) =>{
    let time = args[0];
        let question = args.slice(1).join(" ");
        if(!question){
            message.reply("Il manque la question")
        }
        let regex = new RegExp(/^([0-9]{2}|[0-9]{1})[sSmM]$/);
        if(regex.test(time)) {
            if(time.toLowerCase().endsWith('s')) {
                time = parseInt(time.substring(0, time.indexOf('s')));
                time *= 1000;
            } 
            else if(time.toLowerCase().endsWith('m')) {
                time = parseInt(time.substring(0, time.indexOf('m')));
                time *= 60 * 1000;
            }
            const embed = new MessageEmbed()
                .setTitle(question)
                .setDescription('Pour => 👍 Contre => 👎')
                .setTimestamp();
            try {
                const polls = new Map();
                const userVotes = new Map();
                let filter = (reaction, user) => {
                    if(user.bot) return false;
                    if(['👍', '👎'].includes(reaction.emoji.name)) {
                        if(polls.get(reaction.message.id).get(user.id))
                            return false;
                        else {
                            userVotes.set(user.id, reaction.emoji.name);
                            return true;
                        }
                    }
                }
                let msg = await message.channel.send(embed);
                await msg.react('👍');
                await msg.react('👎');
                polls.set(msg.id, userVotes);
                let reactions = await msg.awaitReactions(filter, { time: time });
                let thumbsUp = reactions.get('👍');
                let thumbsDown = reactions.get('👎');
                let thumbsUpResults = 0, thumbsDownResults = 0;
                if(thumbsUp)
                    thumbsUpResults = thumbsUp.users.cache.filter(u => !u.bot).size;
                if(thumbsDown)
                    thumbsDownResults = thumbsDown.users.cache.filter(u => !u.bot).size;
                const resultsEmbed = new MessageEmbed()
                    .setTitle('Resultat')
                    .setDescription(`👍 - ${thumbsUpResults} votes\n\n👎 - ${thumbsDownResults} votes\n`);
                await message.channel.send(resultsEmbed);
            }
            catch(err) {
                console.log(err);
            }
        }
        else{
            message.reply("Le temps n'est pas corectement mis")
        }
}


module.exports.help = exportsCommandName().MESSAGES.COMMANDS.QUEST.LIKEORDISLIKE;
    