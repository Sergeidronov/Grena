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

client.login(process.env.BOT_TOKEN);