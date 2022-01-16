const Discord = require('discord.js'),  
const client = new Discord.Client();
    


bot.on(`ready`, (ABC)=>{
    console.log("Ready");
});

bot.on(`messageCreate`, (message) =>{
    if(message.author.bot) return;
    console.log(message.content);

    message.channel.send("pong");
});

client.login(process.env.BOT_TOKEN);