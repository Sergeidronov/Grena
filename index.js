const {Client} =require("discord.js");
const client = new Client({intents: 3});

client.once("ready", () =>{
    console.log("Online");
});
client.login(process.env.BOT_TOKEN);