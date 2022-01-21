module.exports = async (bot, { message, _emoji }, user) => {
  if (user.bot) return;

  //Check de si c est bien l embed de jali 
  if (message.author.id == bot.config.id) {

    //Si c est pas un channel dm
    if (!message.channel.type == "dm") {
      //pour les role reaction 
      if (message.embeds[0].title.includes("Message reaction")) {
        let listRoles = await bot.getListRole(message.guild, message.embeds[0].title.split(": ")[1]);
        listRoles.listRole.forEach(values => {
          if (he.encode(_emoji.toString()) == values.emodji) {
            let role = message.guild.roles.cache.get(values.idRole.split("&")[1].split(">")[0]);
            if (role) {
              let member = message.guild.members.cache.get(user.id);
              member.roles.remove(role);
            }

          };
        });
      }
    }
  }
}