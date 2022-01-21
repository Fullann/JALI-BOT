const { MessageEmbed } = require("discord.js");

module.exports = async (bot, oldMember,newMember) => {
	if(oldMember.user.bot)return;

	const settings = await (bot.getGuild(newMember.guild));

	if(settings.guiLogsMembers && settings.guiLog && settings.guiLogChannel !== null){

		let logChannel = bot.channels.cache.find(c => c.id == settings.guiLogChannel);

        const embedlog = new MessageEmbed()
        .setTimestamp()
        .setColor(`${bot.config.color.medium}`)
        .setTitle(`Modification de profil: ${oldMember.user.name}#${oldMember.user.discriminator}`)
        .setFooter(`ID : ${newMember.user.id}`)

        if(oldMember.user.name !== newMember.user.name || oldMember.user.discriminator !== newMember.user.discriminator){
            embedlog.addField("Pseudo",`${oldMember.user.name}#${oldMember.user.discriminator} => ${newMember.user.name}#${newMember.user.discriminator}`)
        }

        if(oldMember.roles !== newMember.roles){
			let roleAdd = "";
            let roleSupr = "";
			for (let i = 0; i < newMember.roles.cache.length; i++) {
					if(oldMember.roles.cache[i] != newMember._roles[i]){

					}
			  }
        }

       
/*
        if(oldMember.permissions.serialize() !== role2.permissions.serialize()){
            let messagePos = "";
            let messageNeg = "";
            for (let i in role1.permissions.serialize()) {
                if(!role1.permissions.serialize()[i] && role2.permissions.serialize()[i]){
                    messagePos += `${i},`
                }

                if(role1.permissions.serialize()[i] && !role2.permissions.serialize()[i]){
                    messageNeg += `${i},`
                }
            }

            if(messagePos !== ""){
                let messagep = await bot.permTranslate(messagePos);
                embedlog.addField("Permission ajoutées",`${messagep}`)
            }

            if(messageNeg !== ""){
                let messagen = await bot.permTranslate(messageNeg);
                embedlog.addField("Permission supprimée",`${messagen}`)
            }
        }*/
        logChannel.send(embedlog)
    }
};