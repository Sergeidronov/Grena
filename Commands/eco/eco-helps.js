const { MessageEmbed } = require("discord.js");
const eco = require("../../Structures/Handlers/Economy");

module.exports = {
    name: "eco-help",
    description: "Shows economy commands",
    userPermissions: ["SEND_MESSAGES"],
    category: "Economy",

    execute: async (interaction, client, args) => {
        const helpEmbed = new MessageEmbed()
        .setTitle("Economy Help")
        .setDescription('**__Bot Commands:__**\n/help\n/balance\n/daily\n/weekly\n/work\n/eco-leaderboard\n/bank-leaderboard\n/withdraw\n/deposit')
        .setColor("RANDOM")


        interaction.reply({embeds: [helpEmbed]})
    }
}