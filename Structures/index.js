const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./bot.js', { token: 'OTI4NjIxNzY5ODI3NDQyNzA4.Ydbcag.f9wJmyrtPAksJFbwYB1UNUEJmHQ' });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();

client.shard.fetchClientValues('guilds.cache.size').then(console.log);

client.shard.fetchClientValues('guilds.cache.size')
	.then(results => {
		console.log(`${results.reduce((acc, guildCount) => acc + guildCount, 0)} total guilds`);
	})
	.catch(console.error);

    client.shard
	.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
	.then(results => {
		return interaction.reply(`Total member count: ${results.reduce((acc, memberCount) => acc + memberCount, 0)}`);
	})
	.catch(console.error);

    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
    ];
    
    Promise.all(promises)
        .then(results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            return interaction.reply(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
        })
        .catch(console.error);

        manager.spawn()
	.then(shards => {
		shards.forEach(shard => {
			shard.on('message', message => {
				console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
			});
		});
	})
	.catch(console.error);

    client.shard.broadcastEval(c => {
        if (c.shard.ids.includes(0)) process.exit();
    });

    