const { Client, Intents, Collection, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Client({ intents: [32767] })
const { token } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

client.once("ready", () =>{
    console.log("Online");
});
client.login(process.env.BOT_TOKEN);