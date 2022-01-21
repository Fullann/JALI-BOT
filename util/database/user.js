module.exports = (bot) => {

  /**
   * Récupération d'un user
   * @param {*} guild 
   * @param {*} ID 
   * @returns 
   */
  bot.getUser = (guild, ID) => {
    return new Promise((resolve, reject) => {
      bot.db.query(`SELECT * FROM t_member WHERE FkGuild  = '${guild.id}' AND idUser = '${ID}'`, (err, results) => {
        //Si on a trouver le user
        if (results.length < 1) {
          bot.db.query(`INSERT into t_member (idUser , FkGuild) VALUES ('${ID}','${guild.id}')`);
        }
        //Sinon on le crée
        else {
          resolve(results[0]);
        }
      });
    });
  };

  bot.updateUserSettings = async (guild, row, settings, id) => {
    bot.db.query(`UPDATE t_member SET ${row} = '${settings}' WHERE idUser = ${id} AND FkGuild = ${guild.id};`);
  };

  bot.deleteUser = async (guild, ID) => {
    await User.findOneAndDelete({ guildID: guild.id, userID: ID }, (err) => {
      if (err) console.log(err);
    })
  };

  bot.deletesUser = async (guild) => {
    await User.findOneAndDelete({ guildID: guild.id }, (err) => {
      if (err) console.log(err);
    });
  };

  /**
   * Récupération de tous les user d'une guild
   * @param {*} guild 
   * @returns 
   */
  bot.getUsersFromGuild = async (guild) => {
    return new Promise((resolve, reject) => {
      bot.db.query(`SELECT * FROM t_member WHERE FkGuild  = '${guild.id}'`, (err, results) => {
        resolve(results);
      });
    });
  };

  //Pour récup un membre avec sa mention ou son nom
  bot.getMember = async (message, toFind = '') => {
    toFind = toFind.toLowerCase();

    let target = message.guild.members.cache.get(toFind)
    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.members.cache.find(member => {
        return member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind)
      });
    }
    if (!target)
      target = message.member;

    return target;
  };
};