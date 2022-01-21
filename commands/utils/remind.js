const {MESSAGES} = require("../../util/constants")

module.exports.run = async (client,message,args) =>{
	let time = args[0];
	let reminder = args.splice(1).join(' ');

	if (!time) return message.reply(`${bot.config.emojis.error} - Il manque le temps`);
	if (!reminder) return message.reply(`${bot.config.emojis.error} - Tu as oublier de mettre ce que je dois te rappler`);

	time = await time.toString();

	let timems;

	if (time.indexOf('s') !== -1) { // Seconds
		let timesec = await time.replace(/s.*/, '');
	    timems = await timesec * 1000;
	} else if (time.indexOf('m') !== -1) { // Minutes
		let timemin = await time.replace(/m.*/, '');
		timems = await timemin * 60 * 1000;
	} else if (time.indexOf('h') !== -1) { // Hours
		let timehour = await time.replace(/h.*/, '');
		timems = await timehour * 60 * 60 * 1000;
	} else if (time.indexOf('d') !== -1) { // Days
		let timeday = await time.replace(/d.*/, '');
		timems = await timeday * 60 * 60 * 24 * 1000;
	}	else {
		return message.channel.send(`${bot.config.emojis.error} - Le temps doit être en format => <number>[s/m/h/d]`);
	}

	message.reply(`Dans \`${time}\` je te rapellerais de \`${reminder}\``);

	setTimeout(function () {
		message.reply(`Il y a \`${time}\` tu m'as demander de te dire :\n \`${reminder}\``);
	}, parseInt(timems));

}

module.exports.help = MESSAGES.COMMANDS.UTILS.REMIND;   