const { Client } = require("discord.js")
const mongoose = require("mongoose");
const {Database} = require("../../Structures/config.json");
const client = require('discord-rich-presence')('180984871685062656');

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute (client) {

        
    
        

        if (!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The Client is now connect to database!")

        }).catch((err) => {
            console.log(err)
        })
    }
}
