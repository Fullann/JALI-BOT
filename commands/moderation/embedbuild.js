const { MessageEmbed, ReactionCollector } = require("discord.js");
const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot, message, args, settings) => {
    let embedBeforeEdit = new MessageEmbed()
        .setDescription('Embed to edit')

    let msgEmbedForEditing = await message.channel.send(embedBeforeEdit);
    const msgwait = await message.channel.send(`Veuilliez patitenter la fin de l'ajout des réactions.`)

    await Promise.all(['✏️', '💬', '🕵️', '🔻', '🔳', '🕙', '🖼️', '🌐', '🔵', '↩️', '📥', '✅', '📑'].map(r => msgwait.react(r)));
    await msgwait.edit(`:pencil2: Modifier le titre\n:speech_balloon: Modifier la description\n:detective: Modifier l'auteur\n:small_red_triangle_down: Modifier le footer\n:white_square_button: Modifier le thumbnail\n:clock10: Ajouter un timestamp\n:frame_photo: Modifier l'image\n:globe_with_meridians: Modifier l'url\n:blue_circle: Modifier la couleur\n:leftwards_arrow_with_hook: Ajouter un field\n:inbox_tray: Copier un embed existant\n:white_check_mark: Envoyer l'embed\n:bookmark_tabs: Modifier un message du bot avec cet embed`);

    const filterReaction = (reaction, user) => user.id === message.author.id && !user.bot;
    const filterMsg = (m) => m.author.id === message.author.id && !m.author.bot

    const collectorReaction = await new ReactionCollector(msgwait, filterReaction);

    collectorReaction.on('collect', async reaction => {
        switch (reaction._emoji.name) {
            case '✏️':
                const msgQuestionTitle = await message.channel.send('Quel est votre titre ?')
                const title = (await message.channel.awaitMessages(filterMsg, { max: 1, time: 60_000 })).first().content;

                msgQuestionTitle.delete();
                embedBeforeEdit.setTitle(title);
                msgEmbedForEditing.edit(embedBeforeEdit);

                break;

            case '💬':
                const msgQuestionDescription = await message.channel.send('Quel est votre description ?')
                const description = (await message.channel.awaitMessages(filterMsg, { max: 1, time: 60_000 })).first().content;

                msgQuestionDescription.delete();
                embedBeforeEdit.setDescription(description);
                msgEmbedForEditing.edit(embedBeforeEdit);

                break;

            case '🕵️':
                const msgQuestionAuthor = await message.channel.send('Quel est votre auteur ?')
                const author = (await message.channel.awaitMessages(filterMsg, { max: 1, time: 60_000 })).first().content;

                msgQuestionAuthor.delete();
                embedBeforeEdit.setAuthor(author);
                msgEmbedForEditing.edit(embedBeforeEdit);

                break;

            case '🔻':
                const msgQuestionFooter = await message.channel.send('Quel est votre footer ?')
                const footer = (await message.channel.awaitMessages(filterMsg, { max: 1, time: 60_000 })).first().content;

                msgQuestionFooter.delete();
                embedBeforeEdit.setFooter(footer);
                msgEmbedForEditing.edit(embedBeforeEdit);

                break;

            case '🔳':
                const msgQuestionThunbail = await message.channel.send('Quel est votre thumbnail ?')
                const thunbail = (await message.channel.awaitMessages(filterMsg, { max: 1, time: 60_000 })).first().content;
                if (!thunbail.includes('.png') || !thunbail.includes('.jpg')) return message.channel.send(`${bot.config.emojis.error} - Thumbnail non conforme`)
                msgQuestionThunbail.delete();
                embedBeforeEdit.setThumbnail(thunbail);
                msgEmbedForEditing.edit(embedBeforeEdit);

                break;

            case '🕙':
                embedBeforeEdit.setTimestamp();
                msgEmbedForEditing.edit(embedBeforeEdit);

                break;

            case '🖼️':
                const msgQuestionImage = await message.channel.send('Quel est votre image ?')
                const image = (await message.channel.awaitMessages(filterMsg, { max: 1, time: 60_000 })).first().content;
                console.log(message)
                if (!image.includes('.png') || !image.includes('.jpg')) return message.channel.send(`${bot.config.emojis.error} - Image non conforme`)

                msgQuestionImage.delete();
                embedBeforeEdit.setImage(image);
                msgEmbedForEditing.edit(embedBeforeEdit);

                break;

            case '🌐':
                const msgQuestionUrl = await message.channel.send('Quel est votre url ?')
                const url = (await message.channel.awaitMessages(filterMsg, { max: 1, time: 60_000 })).first().content;
                if (!url.includes('http') || !url.includes('https')) return message.channel.send(`${bot.config.emojis.error} - Url non conforme`)

                msgQuestionUrl.delete();
                embedBeforeEdit.setURL(url);
                msgEmbedForEditing.edit(embedBeforeEdit);

                break;

            case '🔵':
                const msgQuestionColor = await message.channel.send('Quel est votre couleur ?')
                const color = (await message.channel.awaitMessages(filterMsg, { max: 1, time: 60_000 })).first().content;

                msgQuestionColor.delete();
                embedBeforeEdit.setColor(color);
                msgEmbedForEditing.edit(embedBeforeEdit);

                break;


            case '↩️':
                const msgQuestionField = await message.channel.send('Quel est votre titre du field ?')
                const titleField = (await message.channel.awaitMessages(filterMsg, { max: 1, time: 60_000 })).first().content;

                msgQuestionField.delete();

                const msgQuestionDescField = await message.channel.send('Quel est votre titre du field ?')
                const DescField = (await message.channel.awaitMessages(filterMsg, { max: 1, time: 60_000 })).first().content;

                msgQuestionDescField.delete();

                embedBeforeEdit.addField(titleField, DescField);
                msgEmbedForEditing.edit(embedBeforeEdit);

                break;

            case '✅':
                const msgQuestionChannel = await message.channel.send('Merci de mettre l id du salon')
                const channel = (await message.channel.awaitMessages(filterMsg, { max: 1, time: 60_000 })).first().content;

                msgQuestionChannel.delete();

                if (!message.guild.channels.cache.get(channel)) return message.channel.send(`${bot.config.emojis.error} - Channel non trouvé`)
                message.guilds.channels.cache.get(channel).send(embedBeforeEdit)

                break;


        }
    })
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MODE.EMBEDBUILD;