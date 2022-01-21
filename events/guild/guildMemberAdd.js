const { MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');
const createCaptcha = require('./captcha');
const fs = require('fs');

module.exports = async (bot, member) => {
    if(member.user.bot)return;

    const settings = await (bot.getGuild(member.guild));
    const logChannel = bot.channels.cache.find(c => c.id == settings.guiLogChannel);
    const joinChannel = bot.channels.cache.find(c => c.id == settings.guiJoinChannel);
    const msgPvJoin = bot.transform(settings.guiMsgPVLogin,member);

    //En cours
    if (settings.guiLog && settings.guiLogChannel !== null && (settings.guiCaptcha == 1 || settings.guiVerif == 1)) {
        const embedlog1 = new MessageEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor(bot.config.color.inferieur)
            .setDescription(`${member.user}** est en cours de validation**`)
            .setTimestamp()
			.setFooter(`ID : ${member.id}`)

        logChannel.send(embedlog1);
    }

    //Verif
    if (settings.guiVerif == 1) {
        const msg = await member.send("Taper verif pour verfifier que vous êtes bien humain")
        const filter = m => {
            if (m.author.bot) return;
            if (m.author.id === member.id && m.content === "verif") return true;
            else {
                m.channel.send('faute de frappe');
                return false;
            }
        }
        const response = await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
        if (response) {
            if (settings.guiRoleNewMember !== null) {
                await member.roles.add(settings.guiRoleNewMember);
            }
            await msg.channel.send(`${msgPvJoin}`);
        }
        else{
            await msg.channel.send(`${bot.emotes.error} - Le temps est écoulé.`);
            await member.kick();
        }
    }

    //Captcha
    if (settings.guiCaptcha == 1) {
        const captcha = await createCaptcha();
        try {
            const msg = await member.send(`${bot.emotes.time} - Vous avez une minute pour vous valider`, {
                files: [{
                    attachment: `${__dirname}/captchas/${captcha}.png`,
                    name: `${captcha}.png`
                }]
            });
            try {
                const filter = m => {
                    if (m.author.bot) return;
                    if (m.author.id === member.id && m.content === captcha) return true;
                    else {
                        m.channel.send('Le captcha est incorrect.');
                        return false;
                    }
                };
                const response = await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
                if (response) {
                    await fs.unlink(`${__dirname}/captchas/${captcha}.png`, (err => { }));

                    if (settings.guiRoleNewMember !== null) {
                        await member.roles.add(settings.guiRoleNewMember);
                    }
                    await msg.channel.send(`${msgPvJoin}`);
                }
            }
            catch (err) {
                await msg.channel.send(`${bot.emotes.error} - Le temps est écoulé.`);
                await member.kick();
                await fs.unlink(`${__dirname}/captchas/${captcha}.png`, (err => { }));
            }
        }
        catch (err) { }
    }
    //Join dans joinchannel
    if (settings.guiJoin && settings.guiJoinChannel !== null) {


        let msgGuild = bot.transform(settings.guiMsgWelcome,member);
        
        const canvas = Canvas.createCanvas(700, 350);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage("https://longreadsblog.files.wordpress.com/2018/12/80s-sci-fi-sunset.jpg");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        let x = canvas.width / 2 - ctx.measureText(msgGuild).width / 2
        ctx.fillText(msgGuild, x, canvas.height - 30);

        ctx.beginPath();
        ctx.arc(canvas.width / 2, 150, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, canvas.width / 2 - 100, 50, 200, 200);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

        joinChannel.send(attachment);

    }

    //join dans log
    if (settings.guiLog && settings.guiLogsWelcome && settings.guiLogChannel !== null) {
        const embedlog2 = new MessageEmbed()
			.setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor(bot.config.color.add)
            .setDescription(`${member.user}** : A rejoint le serveur**`)
            .addField("Création du compte",`${await bot.formatDate(member.user.createdAt)}`)
            .setTimestamp()
			.setFooter(`ID : ${member.id}`)

        logChannel.send(embedlog2)  
    }
    //ajout du role
    if (settings.guiNewRole && settings.guiRoleNewMember !== null) {
        await member.roles.add(settings.guiRoleNewMember);
    }
}