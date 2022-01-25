const { Client } = require("discord.js")
const mongoose = require("mongoose");
const {Database} = require("../../Structures/config.json");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute (client) {

        const RPC = require(`discord-rpc`);
        const rpc = new RPC.Client({
            transport: `ipc`
        });
        rpc.on(`ready`, () =>{
            rpc.setActivity({
                details: "Создаю дискорд бота",
                startTimestamp: new Date(),
                largeImageKey: "bot_m",
                largeImageText: "Типо дискорд лого",
            });
            console.log(`RPC is running`);
        })
        
        rpc.login(
            {
                clientId: `928621769827442708`
            }
        )


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
