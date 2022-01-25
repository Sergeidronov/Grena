const { Client, Collection, Intents, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");;
const client = new Client({ intents: [32767] })
module.exports = client;
const { token } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { Permissions } = require('discord.js');
const DiscordDB = require('simple-discord.db');
const fs = require('fs');
const ms = require(`ms`);





client.applicationCommands = [];
client.aliases = new Collection()
client.commands = new Collection();

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});





// Logging System client
const logs = require('discord-logs');
logs(client, {
    debug: true
}); // thats all jk





 //client.login(process.env.BOT_TOKEN);
  client.login(token);
