const { MessageEmbed } = require("discord.js");
const { help } = require("./embedReaction/help");

module.exports = async (bot, reaction, user) => {
  //Si c est un bot on renvoie rien
  if (user.bot) return;
  const message = reaction.message;

  //Check de si c est bien l embed de jali 
  if (message.author.id == bot.config.id) {
    //Si c est pas un channel dm
    if (message.channel.type != "dm") {
      if (message.embeds[0] != undefined || message.embeds[0] != undefined) {
        const settings = await bot.getGuild(message.guild);
        //Pour le help
        if (message.embeds[0].footer.text.includes("Help")) {
          if (Number(Date.now() - 60_000) < message.embeds[0].timestamp) {
            help(bot, message, reaction.emoji, settings, user);
            reaction.users.remove(user)
          }
          else {
            message.delete()
            message.channel.send(`${bot.config.emojis.error} - Ce message est désactivé`)
          }
        }
        //Si c est un ticket
        else if (message.embeds[0].footer.text.includes("Ticket")) {
          //Récupert le membre
          const member = message.guild.members.cache.get(user.id);
          //Récupert le channel de log
          let logChannel = message.guild.channels.cache.find(c => c.id == settings.guiLogChannel) || message.channel;

          switch (reaction.emoji.name) {
            case "📑":
              reaction.users.remove(user);
              if (settings.guiCategoryTicket == null) return message.channel.send(`${bot.config.emojis.error} - Pas de catégorie sélectionner`)
              let categoryID = settings.guiCategoryTicket;
              let channel = await message.guild.channels.create(`Ticket - ${user.username}`, { type: 'text', parent: message.guild.channels.cache.get(categoryID) });

              channel.updateOverwrite(message.guild.roles.everyone, { 'VIEW_CHANNEL': false });
              channel.updateOverwrite(member, { 'VIEW_CHANNEL': true, 'SEND_MESSAGE': true, 'ADD_REACTIONS': true });

              channel.updateOverwrite(message.guild.roles.cache.find(role => role.id == settings.guiAdminRole), { 'VIEW_CHANNEL': true });

              let embed = new MessageEmbed()
                .setTitle('Ticket')
                .setDescription(`Expliqué nous votre demande ${member}`)
                .setTimestamp()
                .setFooter('Ticket')

              channel.send(embed).then(async msg => msg.react('🛑'))

              let log = new MessageEmbed()
                .setDescription(`Un ticket a été crée dans le salon ${channel}`)
                .setColor(bot.config.color.rdm)
                .setTimestamp()
                .setTitle('Ticket Open')

              logChannel.send(log)

              break;
            case "🛑":
              if (!message.channel.name.startsWith('ticket')) return;
              if (!member.guild.roles.cache.has(settings.guiAdminRole)) return;

              let log2 = new MessageEmbed()
                .setDescription(`Le ticket  ${channel.name} vient d'être fermé`)
                .setColor(bot.config.color.rdm)
                .setTimestamp()
                .setTitle('Ticket Close')

              message.channel.delete();


              logChannel.send(log2)
              break
          }
        }
        //Réponse au message
        else if (message.embeds[0].title.includes("Message - Jali")) {
          let filter = m => {
            if (bot.checkRole(m.author)) {
              if (m.content.toLowerCase() === 'send') collector.stop();
              else return true;
            }
            else return false;
          }

          let collector = message.channel.createMessageCollector(filter, { maxMatches: 10 });
          let msg = await getOptions(collector);
          let sender = bot.users.cache.get(message.embeds[0].footer.text.split('ID : ')[1])
          let msgTemp = "";


          for (let i = 0; i < msg.length; i++) {
            msgTemp += msg[i] + '\n'
          }

          let rep = new MessageEmbed()
            .setColor(bot.config.color.bot)
            .setTimestamp()
            .setTitle('Réponse Staff')
            .setFooter(`${bot.config.name} vous remercie`, bot.user.avatarURL())
            .setDescription(msgTemp)

          sender.send(rep)

          function getOptions(collector) {
            return new Promise((resolve, reject) => {
              collector.on('end', collected => resolve(collected.map(m => m.content.toLowerCase())));
            });
          }
        }

        //Pour les ticket de jali
        else if (message.embeds[0].title.includes("Ticket - Jali")) {
          let member = bot.users.cache.get(message.embeds[0].footer.text.split('ID: ')[1])

          if (reaction.emoji.name == "🔒") {
            let log = new MessageEmbed()
              .setDescription(`Votre ticket vien d'être fermé par ${user.username}.\nNous vous remercions de votre demande.`)
              .setColor(bot.config.color.rdm)
              .setTimestamp()
              .setTitle('Ticket Close')
              .setFooter(`ID de la demande ${message.channel.id}`, bot.user.avatarURL())

            member.send(log)

            message.channel.delete();
          }
        }

        //pour les role reaction
        else if (message.embeds[0].title.includes("reaction.message reaction")) {
          let listRoles = await bot.getListRole(message.guild, message.embeds[0].title.split(": ")[1]);
          listRoles.listRole.forEach(values => {
            if (he.encode(reaction.emoji.toString()) == values.emodji) {
              let role = message.guild.roles.cache.get(values.idRole.split("&")[1].split(">")[0]);
              if (role) {
                let member = message.guild.members.cache.get(user.id);
                member.roles.add(role);
              }

            };
          });
        }
      }
    }
    else {
      if (message.embeds[0].title.includes("Ticket")) {
        //User qui ferme son ticket
        if (reaction.emoji.name == "🔒") {
          let channel = bot.guilds.cache.get(bot.config.guildManage).channels.cache.get(message.embeds[0].footer.text.split('ID de la demande ')[1]);

          let log = new MessageEmbed()
            .setDescription(`Vous venez de fermez votre ticket`)
            .setColor(bot.config.color.rdm)
            .setTimestamp()
            .setTitle('Ticket Close')
            .setFooter(`ID de la demande ${channel.id}`, bot.user.avatarURL())

          message.channel.send(log)

          channel.delete();
        }
      }
    }
  }
}
