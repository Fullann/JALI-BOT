const Canvas = require("canvas")
const Discord = require("discord.js")
const {MESSAGES} = require("../../util/constants")

module.exports.run = async (bot,message,args) => {

    if (!args[0]) {
        var user = message.author;
      } else {
        var user = message.mentions.users.first() || bot.users.cache.get(args[0]);
      }
    
      const canvas = Canvas.createCanvas(640, 360);
      const ctx = canvas.getContext("2d");
      //? Generate image
      var background = await Canvas.loadImage(
        "https://i.pinimg.com/736x/07/9e/96/079e962a9c3ba806116b33fb75ea7b60.jpg"
      );
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#C0C0C0";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
      //? Avatar
    
      ctx.beginPath();
      ctx.arc(150, 125, 100, 0, Math.PI * 2, true);
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#FFFCFC";
      ctx.stroke();
      ctx.closePath();
      ctx.clip();
      const avatar = await Canvas.loadImage(
        user.displayAvatarURL({ format: "jpg" })
      );
    
      ctx.drawImage(avatar, 50, 25, 200, 200);
    
      //? Send
      const stonks = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "stonks.png"
      );
    
      return message.channel.send(stonks);
}
module.exports.help = MESSAGES.COMMANDS.SERVPERSO.STONKS;
   
