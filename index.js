const Discord = require('discord.js'),
    config = require('./config.json');
const client = new Discord.Client();
config.cfg.intents = new Discord.Intents(config.cfg.intents);
    
const bot = new Discord.Client(config.cfg);
client.login(process.env.BOT_TOKEN);

bot.on(`ready`, (ABC)=>{
    console.log("Ready");
});

bot.on(`messageCreate`, (message) =>{
    if(message.author.bot) return;
    console.log(message.content);

    message.channel.send("pong");
});