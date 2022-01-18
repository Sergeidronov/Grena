const { Client, Collection, Intents, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");;
module.exports = {
    name: "ping",
    description: "Tiempo de respuesta",
    roles: ["admin", "coder"],
    async execute(client, message, args, discord) {
      message.channel.send("!PONG 😄");
    },
  };