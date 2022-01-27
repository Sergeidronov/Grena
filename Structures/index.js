const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./bot.js', { token: 'OTI4NjIxNzY5ODI3NDQyNzA4.Ydbcag.f9wJmyrtPAksJFbwYB1UNUEJmHQ' });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();