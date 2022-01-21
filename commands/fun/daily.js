const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args,settings,settingsUser,translate) => {
    //Jour actuel
    const dailyCD = 8.64e+7;

    //Le dernier jour ou il y a eu la commande
    const lastDaliy = settingsUser.useDailyCoin;

    //check si il peut avoir de l argent
    if(lastDaliy !== null && dailyCD - (Date.now() - lastDaliy) > 0){
        //si il peut pas
        const cdTime = dailyCD - (Date.now() - lastDaliy);
        message.channel.send(translate("TIME_TO_WAITE",bot,cdTime))
    }
    else{
        //si il peut
        //argent a ajouter
        let cointoadd = Math.ceil(Math.random()* 100)
        
        //on update
         await bot.updateUserSettings(message.guild, "useCoin", settingsUser.useCoin + cointoadd, message.author.id);
         await bot.updateUserSettings(message.guild, "useDailyCoin",  Date.now(), message.author.id);
         message.channel.send(translate("DAILY_SUCCESS",bot,cointoadd));
    }
}

module.exports.help = MESSAGES.COMMANDS.FUN.DAILY;