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
        .setColor("WHITE")
        .setTitle("*Группа ВК*")
        .addField("https://vk.com/sff_server")
       

        interaction.reply({ embeds: [Vk], ephemeral: true });
    }
}