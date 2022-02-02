const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "vk",
    description: "Ссылка на группу вк",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {



        const Vk = new MessageEmbed()
        .setColor("WHITE")
        .setTitle("*Группа ВК*")
        .setDescription('https://vk.com/sff_server')
        interaction.reply({ embeds: [Vk], ephemeral: true });
    }
}