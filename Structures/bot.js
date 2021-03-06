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
const Discord = require('discord.js')








client.applicationCommands = [];
client.aliases = new Collection()
client.commands = new Collection();

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

require("./Handlers/Anti-Crash")(client);
client.voiceGenerator = new Collection()



function findEmoji(c, { nameOrId }) {
	return c.emojis.cache.get(nameOrId) || c.emojis.cache.find(e => e.name.toLowerCase() === nameOrId.toLowerCase());
}

client.on('interactionCreate', interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'send') {
		const id = interaction.options.getString('destination');

		return client.shard.broadcastEval(async (c, { channelId }) => {
			const channel = c.channels.cache.get(channelId);
			if (channel) {
				await channel.send(`This is a message from shard ${client.shard.ids.join(',')}!`);
				return true;
			}
			return false;
		}, { context: { channelId: id } })
			.then(sentArray => {
				if (!sentArray.includes(true)) {
					return interaction.reply('I could not find such a channel.');
				}

				return interaction.reply(`I have sent a message to channel: \`${id}\`!`);
			});
	}

	if (commandName === 'emoji') {
		const emojiNameOrId = interaction.options.getString('emoji');

		return client.shard.broadcastEval(findEmoji, { context: { nameOrId: emojiNameOrId } })
			.then(emojiArray => {
				// Locate a non falsy result, which will be the emoji in question
				const foundEmoji = emojiArray.find(emoji => emoji);
				if (!foundEmoji) return interaction.reply('I could not find such an emoji.');
				return interaction.reply(`I have found the ${foundEmoji.animated ? `<${foundEmoji.identifier}>` : `<:${foundEmoji.identifier}> emoji!`}!`);
			});
	}
});



 //client.login(process.env.BOT_TOKEN);
  client.login(token);
