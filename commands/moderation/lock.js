const {exportsCommandName} = require("../../util/loader")
const ms = require('ms');

module.exports.run = async (client,message,args) =>{
	if (!client.lockit) client.lockit = [];
	const time = args.join(' ');
	const validUnlocks = ['debloque', 'unlock'];
  
	if (validUnlocks.includes(time)) {
		message.channel.overwritePermissions([{
			id:message.guild.id,
			allow :["SEND_MESSAGES"]}]
		  ).then(() => {
		message.channel.send(`${bot.config.emojis.success} - Ce channel n'est plus bloquer`);
		clearTimeout(client.lockit[message.channel.id]);
		delete client.lockit[message.channel.id];
	  }).catch(error => {
		console.log(error);
	  });
	} else {
	  message.channel.overwritePermissions([{
		id:message.guild.id,
		deny:["SEND_MESSAGES"]}]
	  ).then(() => {
		message.channel.send(`${bot.config.emojis.success} -  Ce channel a été bloquer pour : ${ms(ms(time), { long:true })}`).then(() => {
  
		  client.lockit[message.channel.id] = setTimeout(() => {
			message.channel.overwritePermissions([{
				id:message.guild.id,
				allow :["SEND_MESSAGES"]}]
			  ).then(message.channel.send(`${bot.config.emojis.success} - Ce channel n'est plus bloquer`)).catch();
			delete client.lockit[message.channel.id];
		  }, ms(time));
  
		}).catch(error => {
		  console.log(error);
		});
	  });
	}
}

module.exports.help = exportsCommandName().MESSAGES.COMMANDS.MODE.LOCK;   