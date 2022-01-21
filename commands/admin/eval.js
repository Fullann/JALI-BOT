const { MessageEmbed } = require("discord.js");
const {MESSAGES} = require("../../util/constants")

module.exports.run = async (client,message,args) =>{
  var time = Date.now();
	const code = args.join(' ');
	try {
		const evaled = eval(code);
		const clean = await client.clean(client, evaled);
		if (clean.length > 1800) {
			message.channel.send(`${clean}\n\nTime taken: ${Date.now() - time}ms`, { code: 'xl', split: true }).catch(console.error);
		} else {
			var evalEmbed = new MessageEmbed()
				.setAuthor(client.user.username, client.user.avatarURL || client.user.defaultAvatarURL)
				.setTitle('Eval Output')
				.setColor('GREEN')
				.setDescription(`\`\`\`xl\n${clean}\`\`\``)
				.setFooter(`Time taken: ${Date.now() - time}ms`);
			message.channel.send({ embed: evalEmbed }).catch(console.error);
		}
	} catch (err) {
		if (err.message.length < 150) {
			var errorClean = await client.clean(client, err.message);
			var errorEmbed = new MessageEmbed()
				.setTitle('ERROR')
				.setColor('RED')
				.setAuthor(client.user.username, client.user.avatarURL || client.user.defaultAvatarURL)
				.setDescription(`\`\`\`xl\n${errorClean}\`\`\``)
				.setFooter(`Time taken: ${Date.now() - time}ms`);
			message.channel.send({ embed: errorEmbed });
		} else {
			message.channel.send(`\`ERROR (Check console for error stack)\` \`\`\`xl\n${await client.clean(client, err.message)}\n\nTime taken: ${Date.now() - time}ms\n\`\`\``, { split: true });
		}
	}
}

module.exports.help = MESSAGES.COMMANDS.ADMIN.EVAL;
    