const {exportsCommandName} = require("../../util/loader")
const { exec } = require('child_process');
const Discord = require('discord.js');

module.exports.run = async (client,message,args) =>{
	var time = Date.now();
	var code = args.join(' ');

	message.reply(`Commande: \`${code.replace('`', '\`')}\`en cours...Aller vous faire un caffée. (Si cela prend plus de 15sec => error)`); 
	exec(`${code}`, { timeout: 15000 }, (error, stdout) => {
		var response = (error || stdout); 

		if (error) {
			if (error.message.length > 150) {
				message.channel.send(`${error.message}\n\n${Date.now() - time}ms`, { code: 'xl', split: true }).catch(console.error);
			} else {
				var evalEmbed = new Discord.MessageEmbed()
					.setAuthor(client.user.username, client.user.avatarURL || client.user.defaultAvatarURL)
					.setTitle('Eval ERROR')
					.setColor('RED')
					.setDescription(`\`\`\`xl\n${error.message}\`\`\``)
					.setFooter(`Time taken: ${Date.now() - time}ms`);
				return message.channel.send({ embed: evalEmbed }).catch(console.error);
			}
		}

		var clean = response 
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203)) 
			.replace(/\n/g, '\n' + String.fromCharCode(8203)) 
			.replace(client.config.token, 'mfa.VkO_2G4Qv3T-- NO TOKEN HERE... --')

		if (response.length > 1800) { 
			var chunks = [];

			for (var i = 0, charsLength = response.length; i < charsLength; i += 1800) {
				chunks.push('```' + clean.substring(i, i + 1800) + '```'); 
			}


			message.channel.send(`\`OUTPUT\``);
			for (var c = 0; c < chunks.length; c++) {
				endOutput += chunks[i];
				message.channel.send(`${chunks[c]}`).catch(console.error);
			}
			message.channel.send(`\`OUTPUT\` \n\`\`\`\n${endOutput}\`\`\``,).catch(console.error);
		} else {

		if (clean.length > 1800) {
			message.channel.send(`${clean}\n\n${Date.now() - time}ms`, { code: 'xl', split: true }).catch(console.error);
		} else {
			evalEmbed = new Discord.MessageEmbed()
				.setAuthor(client.user.username, client.user.avatarURL || client.user.defaultAvatarURL)
				.setTitle('Eval Output')
				.setColor('GREEN')
				.setDescription(`\`\`\`xl\n${clean}\`\`\``)
				.setFooter(`Temps: ${Date.now() - time}ms`);
			message.channel.send({ embed: evalEmbed }).catch(console.error);
		}
	}
	});
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.ADMIN.EXECUTE;   