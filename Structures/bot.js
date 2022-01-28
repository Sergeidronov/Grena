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

const express = require('express');
const { clientId, clientSecret, port } = require('./config.json');

const app = express();

app.get('/', async ({ query }, response) => {
	const { code } = query;

	if (code) {
		try {
			const oauthResult = await fetch('https://discord.com/api/oauth2/authorize?client_id=928621769827442708&redirect_uri=http%3A%2F%2Flocalhost%3A53134&response_type=code&scope=identify', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${port}`,
					scope: 'identify',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await oauthResult.json();

			const userResult = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			console.log(await userResult.json());
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}

	return response.sendFile('bot.html', { root: '.' });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));




client.applicationCommands = [];
client.aliases = new Collection()
client.commands = new Collection();

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});



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


// Logging System client
const logs = require('discord-logs');
logs(client, {
    debug: true
}); // thats all jk







 //client.login(process.env.BOT_TOKEN);
  client.login(token);
