const {Client} =require("discord.js");
const client = new Client({intents: 3});

client.once("ready", () =>{
    console.log("Online");
});
client.login("OTI4NjIxNzY5ODI3NDQyNzA4.Ydbcag.f9wJmyrtPAksJFbwYB1UNUEJmHQ")