const Discord = require('discord.js');
const { MESSAGES } = require("../../util/constants")

module.exports.run = async (bot, message, args, settings, settingsUser) => {

    if (args == "stop") {
        let channel1 = message.guild.channels.cache.find(c => c.name === 'Team 1');
        let channel2 = message.guild.channels.cache.find(c => c.name === 'Team 2');

        channel1.delete();
        channel2.delete();

        return message.channel.send(`${bot.emotes.success} -  Channels supprimer avec succès`)
    }

    //Fonction pour enlever du tableau
    Array.prototype.unset = function (val) {
        var index = this.indexOf(val)
        if (index > -1) {
            this.splice(index, 1)
        }
    }
    //Check
    if (!message.member.voice.channel) return message.channel.send(`${bot.emotes.error} - Vous n'etes pas dans un channel vocal`);
    if (message.member.voice.channel.members.first() == message.member.voice.channel.members.last()) return message.channel.send(`${bot.emotes.error} - Vous n'êtes pas assez `);

    //Création des channel 
    let channel1 = await message.guild.channels.create("Team 1", { type: 'voice', parent: message.member.voice.channel.parent });
    let channel2 = await message.guild.channels.create("Team 2", { type: 'voice', parent: message.member.voice.channel.parent });

    //Choix de la map
    const map = ["Bind", "Ascent", "Split", "IceBox", "Haven"];
    const botChoice = map[Math.floor(Math.random() * map.length)];

    //Variable
    let allMember = message.member.voice.channel.members.array();
    let team1 = "";
    let team2 = "";

    let bool = true;

    do {
        let rdnPeople = allMember[Math.floor(Math.random() * allMember.length)];

        allMember.unset(rdnPeople)

        if (bool) {
            team1 += rdnPeople.user.username + "\n";
            bool = false
            rdnPeople.voice.setChannel(channel1)
        }
        else {
            team2 += rdnPeople.user.username + "\n";
            bool = true;
            rdnPeople.voice.setChannel(channel2);
        }
    }
    while (allMember.length > 0)

    const embed = new Discord.MessageEmbed()
        .setColor(bot.config.color.rdm)
        .setThumbnail("https://c.wallhere.com/photos/fb/3c/Valorant-1833663.jpg!d")
        .setTitle("**Valorant Perso**")
        .addFields(
            { name: "Map", value: botChoice, inline: true },
            { name: "Team 1", value: team1, inline: true },
            { name: "Team 2", value: team2, inline: true }
        );

    message.channel.send(embed)
    
};
module.exports.help = MESSAGES.COMMANDS.SERVPERSO.VALOPERSO;   