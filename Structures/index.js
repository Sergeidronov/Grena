const { Client, Collection, Intents, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [32767] })
const { token } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { Permissions } = require('discord.js');



client.applicationCommands = [];

client.commands = new Collection();

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});



client.login(token);




