mysql = require('mysql');
module.exports = (bot) => {
  bot.db = mysql.createConnection({
      host: "127.0.0.1",
      port: "3306",
      user: "Jali-DB",
      password: "rNUL2uKxMANfrCuT",
      database: "db_jali_discord"
  });

  // On se connecte à la base de données au démarrage.
  bot.db.connect(function (err) {
      if (err){
        console.log("❌ - Database disconnected \nReason => " + err)
      }
      else{
        console.log("✅ -  Database connected");
      }
  });
}