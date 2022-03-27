const { ShardingManager } = require("discord.js");


const manager = new ShardingManager("./bot.js", {

    totalShards: "auto",
    token: "OTI4NjIxNzY5ODI3NDQyNzA4.Ydbcag.f9wJmyrtPAksJFbwYB1UNUEJmHQ"
});

// Emitted when a shard is created
manager.on("shardCreate", (shard) => console.log(`Shard ${shard.id} launched`));

// Spawn your shards
manager.spawn();