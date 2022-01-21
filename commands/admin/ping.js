const { stripIndents } = require('common-tags');
const {exportsCommandName} = require("../../util/loader")

module.exports.run = async (bot, message) => {
  const msg = await message.channel.send(`🏓 Pinging....`);
  const ping = Math.round(msg.createdTimestamp - message.createdTimestamp);

  if (ping <= 0) {
    return msg.edit(`${bot.config.emojis.error} - Erreur`);
  }

  return msg.edit(
    stripIndents`
        🏓 P${'o'.repeat(Math.ceil(ping / 100))}ng: \`${ping}ms\`
        💓 Heartbeat: \`${Math.round(bot.ws.ping)}ms\`
        `,
  );
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.ADMIN.PING;