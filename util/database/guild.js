/**
 * Event avec les guilds
 * @param {} bot 
 */
module.exports = (bot) => {

  /**
   * Création de nouvelle guild
   * @param {*} guild 
   */
  bot.createGuild = guild => {
    //On crée le champ
    bot.db.query(`INSERT into t_guilds (IdGuild ) VALUES ('${guild.id}')`)
  };

  /**
   * Récupération d'une guild
   * 
   * @param {*} guild 
   */
  bot.getGuild = async guild => {
    return new Promise((resolve, reject) => {
      bot.db.query(`SELECT * FROM t_guilds WHERE IdGuild  = '${guild.id}'`, (err, results) => {
        if (!err) {
          resolve(results[0]);
        }
      });
    });
  };

  bot.SetGuildOff = async (guild) => {
    bot.db.query(`UPDATE t_guilds SET guiIsActive = '0' WHERE IdGuild  = ${guild.id};`);
  };

  bot.SetPersoChannelOn = async (guild) => {
    bot.db.query(`UPDATE t_guilds SET guiChannelPersoActive = '1' WHERE IdGuild  = ${guild.id};`);
  };

  bot.reset = async (guild) => {
    bot.db.query(`UPDATE t_guilds SET guiChannelPersoActive = '0';`);
  }
};