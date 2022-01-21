const {MESSAGES} = require("../../util/constants")
const Bypasser = require('node-bypasser');

module.exports.run = async (client,message,args) =>{

	const w = new Bypasser(args[0]);
	w.decrypt(function(err, result) {
		if (err) {
			message.channel.send(`${bot.config.emojis.error} - Nous avons rencontrer un problème avec votre URL`);
			return;
		}

		message.channel.send(`Votre URL court \`${args[0]}\` \nVotre URL en entier : \n\`${result}\``);
	});
}

module.exports.help = MESSAGES.COMMANDS.UTILS.EXPAND;   