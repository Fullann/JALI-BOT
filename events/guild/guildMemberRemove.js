const Canvas = require('canvas');
const { MessageEmbed } = require("discord.js");

module.exports = async (bot, member) => {
	if(member.user.bot)return;

	const settings = await (bot.getGuild(member.guild));

	if (settings.guiLeave && settings.guiLeaveChannel !== null) {
		const canvas = Canvas.createCanvas(700, 350);
		const ctx = canvas.getContext('2d');
		let msg = bot.transform(settings.guiMsgLeave, member);
		const background = await Canvas.loadImage(`http://www.pngall.com/wp-content/uploads/2/Manga-PNG-Free-Image.png`);
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = '#000';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);

		// Slightly smaller text placed above the member's display name
		ctx.font = '28px sans-serif';
		ctx.fillStyle = '#ffffff';
		ctx.fillText(`${msg}`, canvas.width / 2 - ctx.measureText(msg).width / 2, canvas.height / 1.1);

		ctx.beginPath();
		ctx.arc(canvas.width / 2, 135, 100, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();

		const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
		ctx.drawImage(avatar, canvas.width / 2 - 100, 30, 200, 200);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'leave-image.jpg');

		let leaveChannel = bot.channels.cache.find(c => c.id == settings.guiLeaveChannel);
		leaveChannel.send(attachment)
	}

	//On regarde dans les logs
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
	const kickLog = fetchedLogs.entries.first();

	//Si il est kick
	if (kickLog && settings.guiLog && settings.guiLogsLeaveModertion && settings.guiLogChannel !== null) {

		let kickEmbed = new MessageEmbed()
			.setColor(bot.config.color.delete)
			.addField("Utilisateur kick", `${kickLog.target}`)
			.addField("Modérateur", `${kickLog.executor}`)
			.setTimestamp()
			.setAuthor(`[ KICK ] ${kickLog.target.tag}`, kickLog.target.displayAvatarURL())
			.setFooter(`ID de l'utilisateur : ${kickLog.target.id}`)

		//Si il y a une raison
		if (kickLog.reason != null) {
			kickEmbed.addField("Raison", kickLog.reason)
		}

		//On envoie
		let logChannel = bot.channels.cache.find(c => c.id == settings.guiLogChannel);
		logChannel.send(kickEmbed);
	}
	else {
		//leave dans log
		if (settings.guiLog && settings.guiLogsLeave && settings.guiLogChannel !== null) {
			const settings = await (bot.getGuild(member.guild));
			let logChannel = bot.channels.cache.find(c => c.id == settings.guiLogChannel);


			const embedlog2 = new MessageEmbed()
				.setColor(`${bot.config.color.delete}`)
				.setDescription(`${member} **: A quitter le serveur**`)
				.setTimestamp()
				.setFooter(`ID : ${member.id}`)
				.setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())

			//On envoie
			logChannel.send(embedlog2)

		}
	}
};