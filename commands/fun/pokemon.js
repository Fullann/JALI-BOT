const {exportsCommandName} = require("../../util/loader")
const {getPokemon} = require("../../util/pokemon")
const {MessageEmbed} = require("discord.js")

module.exports.run = async (bot, message, args, settings, settingsUser,translate) =>{

    const pokemon = message.content.toLowerCase().split(" ")[1];
        try {
            const pokeData = await getPokemon(pokemon);
            const { 
                sprites, 
                stats, 
                weight, 
                name, 
                base_experience,
                abilities,
                types
            } = pokeData;
            const embed = new MessageEmbed()
            .setColor(bot.config.color.rdm)
            embed.setTitle(`${name}`)
            embed.setThumbnail(`${sprites.front_default}`);
            stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat, true));
            types.forEach(type => embed.addField(translate("POKEMON_TYPE"), type.type.name, true));
            embed.addField(translate("POKEMON_WEIGHT"), weight);
            embed.addField(translate("POKEMON_XP"), base_experience);
            message.channel.send(embed);
        }
        catch(err) {
            console.log(err);
            message.channel.send(translate("NO_POKEMON",bot,pokemon));
        }
}


module.exports.help = exportsCommandName().MESSAGES.COMMANDS.FUN.POKEMON;
    