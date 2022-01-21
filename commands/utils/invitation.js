const {MESSAGES} = require("../../util/constants")

module.exports.run = async (client,message,args) =>{
    let uses = args[0];
	let temp = args[1];

	if (!uses) {
		return message.reply(`${bot.config.emojis.error} - Vous avez oubliez de mettre le nombre de personne qui peuvent l'utiliser`);
	}
	if (!temp) {
		message.reply(`${bot.config.emojis.error} - Il manque le temps avant la destruction de l'invitation...`);
		temp = await 0;
	}

	uses = await uses.toString();

	if (uses.indexOf('.') !== -1) {
		return message.reply(`${bot.config.emojis.error} - Comment tu veux inviter une demi personne :confused:`);
	}

	temp = await temp.toString();

	if (temp.indexOf('s') !== -1) { // Seconds
		temp = await temp.replace(/s.*/, '');
	} else if (temp.indexOf('m') !== -1) { // Minutes
		let agemin = await temp.replace(/m.*/, '');
		temp = await agemin * 60;
	} else if (temp.indexOf('h') !== -1) { // Hours
		let agehour = await temp.replace(/h.*/, '');
		temp = await agehour * 60 * 60;
	} else if (temp.indexOf('d') !== -1) { // Days
		let ageday = await temp.replace(/d.*/, '');
		temp = await ageday * 60 * 60 * 24;
	} else {
		if (temp.indexOf('.') !== -1) {
			return message.reply('Le temps ne peut pas avoir de virgule');
		}
		temp = await temp; 
	}

	message.channel.createInvite({ maxUses: uses, maxAge: temp }).then((invite) => {
		message.channel.send(`Votre invitation : \`${invite}\` \nPour \`: ${uses}\` personnes et pendant \`${temp}\`ms`);
	});
}

module.exports.help = MESSAGES.COMMANDS.UTILS.INVITE;   