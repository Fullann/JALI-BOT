const {MESSAGES} = require("../../util/constants")
const {MessageEmbed} = require("discord.js")
const Discord = require('discord.js');

module.exports.run = async (client,message,args) =>{
	let command;
	if (client.commands.has(args[0])) {
		command = client.commands.get(args[0]);
	} else if (client.aliases.has(args[0])) {
		command = client.commands.get(client.aliases.get(args[0]));
	}
	if (!command) return message.channel.send(`${client.emotes.error} - \`${args[0]}\` n'existe pas ou l'alliase n'est pas créé`);

	delete require.cache[require.resolve(`../${command.help.category}/${command.help.name}.js`)];
	const cmd = require(`../${command.help.category}/${command.help.name}`);
	client.commands.delete(command.help.name);
	client.aliases.forEach((cmd, alias) => {
		if (cmd === command.help.name) client.aliases.delete(alias);
	});
	client.commands.set(command.help.name, cmd);
	cmd.help.aliases.forEach(alias => {
		client.aliases.set(alias, cmd.help.name);
	});
	message.channel.send(`${client.emotes.success} -  la commande \`${command.help.name}\` a été redémarée`);
}

module.exports.help = MESSAGES.COMMANDS.ADMIN.RELOAD;   