const { Client, Collection, Intents, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");;
const client = new Client({ intents: [32767] })
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

client.commands = new Collection();

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.on('messageCreate', async (message) => {

    if (!message.content.startsWith(config.prefix)) return;
	
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == "button") { 
        const button = new MessageButton()
            .setLabel("Archive")
            .setStyle("PRIMARY")
            .setCustomId("archive");
        const buttons = new MessageActionRow()
            .addComponents(button);
        message.channel.send({content: `button`, components: [buttons]});
    }
    if (command == "select") {
        const selectMenu = new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Ничего не выбрано')
            .addOptions([
                {
                    label: 'Опция 1',
                    description: 'Описание первой опции',
                    value: 'first_option'
                },
                {
                    label: 'Опция 2',
                    description: 'Описание второй опции',
                    value: 'second_option'
                }
            ])
            .setMaxValues(1);
        const menu = new MessageActionRow()
            .addComponents(selectMenu);
        message.channel.send({content: `select menu`, components: [menu]});
    }
    if (command == "slash") {
        message.guild.commands.create({
            name: "slash",
            description: "Описание тестовой Slash команды"
        })
        message.reply("Добавлена Slash команда");
    }
    if (command == "context") {
        message.guild.commands.create({
            name: "contextuser",
            type: "USER"
        })
        
        message.guild.commands.create({
            name: "contextmessage",
            type: "MESSAGE"
        })
        message.reply("Контекстное меню настроено");
    }
    if (command == "deletecommands") {
        var commands = await message.guild.commands.fetch();
        if (commands != undefined) commands.forEach((i) => {
            i.delete();
        })
        message.reply("Команды удалены");
    }
});

client.on('interactionCreate', async (interaction) => {
    console.log(interaction);
    if (interaction.isButton() && interaction.customId == "archive") {
        interaction.reply({
            content: `Ответ на кнопку`,
            ephemernal: true
        });
    }
    
    if (interaction.isSelectMenu() && interaction.customId == "select") {
        interaction.reply({
            content: `Ну вот и ответ на селект: ${interaction.values[0]}!`,
            ephemernal: true
        });
    }

    if (interaction.isCommand() && interaction.commandName == "slash") {
        interaction.reply({
            content: `Ну вот и ответ на слеш команду ${interaction.commandName}!`,
            ephemernal: true
        });
    }

    if (interaction.isContextMenu()) {
        interaction.reply({
            content: `Ну вот и ответ на контекстное меню: ${interaction.commandName}!\ntargetType: ${interaction.targetType}\ntargetId: ${interaction.targetId}`,
            ephemernal: true
        });
    }

});



 //client.login(process.env.BOT_TOKEN);
  client.login(token);
