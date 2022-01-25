const { Client } = require("discord.js")
const mongoose = require("mongoose");
const {Database} = require("../../Structures/config.json");
const client = require('../../Structures/index');
const arrayOfStatus = [
    'создание бота',
]


module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute (client) {
        client.user.setPresence({ activities: [{ name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)] }], status: 'idle', type: "WATCHING" })

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

