const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "vk",
    description: "Посмотреть вк сервера",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {



        const Vk = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Test")

        interaction.reply({ embeds: [Vk], ephemeral: true });
    }
}