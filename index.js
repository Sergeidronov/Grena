const Discord = require("discord.js");
const client = new Discord.Client();
    
client.on(`ready`, (ABC)=>{
    console.log("Ready");
});

client.on(`messageCreate`, (message) =>{
    if(message.author.bot) return;
    console.log(message.content);

    message.channel.send("pong");
});

client.login("OTI4NjIxNzY5ODI3NDQyNzA4.Ydbcag.f9wJmyrtPAksJFbwYB1UNUEJmHQ");