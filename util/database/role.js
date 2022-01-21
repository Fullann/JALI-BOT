const mongoose = require("mongoose")
const { Role,ListRole } = require("../../models/index");
const role = require("../../models/role");

module.exports = (bot) => {

    /**
     * Création de la list pour les roles
     * @param {*} guild 
     */
    bot.creatListRole = async (guild,listName) => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild,listName)
        const listRole = await new ListRole(merged)
        listRole.save()
    }

    /**
     * Création de role
     * @param {*} idRole 
     * @param {*} emodji 
     */
    bot.creatRole = async (idRole,emodji) => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, idRole,emodji)
        const role = await new Role(merged)
        return role;
    }

    bot.getListRole = async (guild,nameList) => {
        const data = await ListRole.findOne({ guildID : guild.id ,listName : nameList}, (err) => {
            if (err) console.log(err);
        });
        if (data) return data;
    }

    bot.getAllList = async (guild) => {
        const data = await ListRole.find({ guildID : guild.id }, (err) => {
            if (err) console.log(err);
        });
        if (data) return data;
    }

    /**
     * Modification de liste des roles
     * @param {*} guild 
     * @param {*} settings 
     */
    bot.updateListRole = async (guild, nameList, settings) => {
        let data = await bot.getListRole(guild,nameList);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    };

    bot.deleteRole = async (guild,nameList) => {
        await ListRole.findOneAndDelete({ guildID: guild.id ,listName : nameList}, (err) => {
          if (err) console.log(err);
        })
      };
};