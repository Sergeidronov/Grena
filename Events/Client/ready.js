const { Client } = require("discord.js")

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute (client) {
        client.user.setActivity("Garry's Mod", {type: "WATCHING"})
    }
}