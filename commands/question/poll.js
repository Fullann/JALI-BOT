    const {exportsCommandName} = require("../../util/loader")
    const discord = require('discord.js');
    const { isNumeric } = require("mathjs");
    
    module.exports.run = async (bot,message,args) =>{
        let time = isNumeric(args[0]) ? args[0] : 10000 ;
        if(args[0] === "stop"){
            stop(bot,message)
            return;
        }
        if(bot.userCreatedPolls.has(message.author.id)) {
            message.channel.send("Vous avez deja un questionnaire en cours !!!");
            return;
        }
        message.channel.send("Envoyer chaque options (par message) une par une dans le salon ci-dessous (max 5) puis tapper done une fois fini");
        let filter = m => {
            if(m.author.id === message.author.id) {
                if(m.content.toLowerCase() === 'done') collector.stop();
                else return true;
            }
            else return false;
        }
        let collector = message.channel.createMessageCollector(filter, { maxMatches: 5 });
        let pollOptions = await getPollOptions(collector);
        if(pollOptions.length < 2) {
            message.channel.send("Il ne peut pas y avoir qu'une option");
            return;
        }
    
        let embed = new discord.MessageEmbed()
        .setTitle(`Sondage crée par ${message.author.username}`)
        .addField("Appuyez sur les réactions ci-dessous pour :",`
            ${bot.config.emojis.success} - Valider le questionnaire
            ${bot.config.emojis.off} - Supprimer le questionnaire
    
            `)
            for (let i = 0; i < pollOptions.length; i++) {
                embed.addField(`${i + 1}) `,pollOptions[i]);
            }
        
        let confirm = await message.channel.send(embed);
        
        await confirm.react('✅');
        await confirm.react('❌');
    
        let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
        let reaction = (await confirm.awaitReactions(reactionFilter, { max: 1 })).first();
    
        if(reaction.emoji.name === '✅') {
            //on supprime l ancien
            message.channel.bulkDelete(1, true)
    
            //On crée le nouveau
            let embedOff = new discord.MessageEmbed()
        .setTitle(`Sondage crée par ${message.author.username}`)
         for (i = 0; i < pollOptions.length; i++) {
            embedOff.addField(`${i + 1}) `,pollOptions[i]);
            }
        await message.channel.send(embedOff);
    
            message.channel.send("Le questionnaire commence dans 1 seconde");
            await delay(1000);
            message.channel.send("Voter !!!");
            let userVotes = new Map();
            let pollTally = new discord.Collection(pollOptions.map(o => [o, 0]));
            let pollFilter = m => !m.bot;
            let voteCollector = message.channel.createMessageCollector(pollFilter, {
                time: time
            });
    
            bot.userCreatedPolls.set(message.author.id, voteCollector);
            await processPollResults(voteCollector, pollOptions, userVotes, pollTally);
            let max = Math.max(...pollTally.array());
            let entries = [...pollTally.entries()];
            let winners = [];
    
            let embed = new discord.MessageEmbed();
            let desc = '';
            entries.forEach(entry => entry[1] === max ? winners.push(entry[0]) : null);
            entries.forEach(entry => desc  += entry[0] + " a reçu " + entry[1] + " votes(s)\n");
            embed.setDescription(desc);
    
            if(winners.length === 1) {
                message.channel.send(winners[0] + " est le gagnant", embed);
            }
            else {
                message.channel.send("Il y a une égaliter", embed);
            }
        }   
        else if(reaction.emoji.name === '❌') {
            message.channel.send("Questionnaire annulé.");
        }
        stop(bot,message);
    }
    
        
    
    function stop(bot,message){
        if(bot.userCreatedPolls.has(message.author.id)) {
            bot.userCreatedPolls.get(message.author.id).stop();
            bot.userCreatedPolls.delete(message.author.id);
           
        }
        else {
            message.channel.send("Il n'y a pas de questionnaire en cours pour le moment !!!");
        }
    }
    
    function processPollResults(voteCollector, pollOptions, userVotes, pollTally) {
        return new Promise((resolve, reject) => {
            voteCollector.on('collect', msg => {
                let option = msg.content.toLowerCase();
                if(!userVotes.has(msg.author.id) && pollOptions[option - 1]) {
                    userVotes.set(msg.author.id, msg.content);
                    let voteCount = pollTally.get(pollOptions[option - 1]);
                    pollTally.set(pollOptions[option - 1], ++voteCount);
                }
            });
            voteCollector.on('end', collected => {
                resolve(collected);
            })
        });
    }
    
    function getPollOptions(collector) {
        return new Promise((resolve, reject) => {
            collector.on('end', collected => resolve(collected.map(m => m.content.toLowerCase())));
        });
    }
    
    function delay(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time)
        })
    }


module.exports.help = exportsCommandName().MESSAGES.COMMANDS.QUEST.POLL;