const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ip",
    description: "Посмотреть IP серверов",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {



        const IP = new MessageEmbed()
        .setColor("WHITE")
        .setTitle("*IP серверов*")
        .addFields(
            { name: 'RP', value: '46.174.53.130:27015' },
            { name: 'BW', value: '62.122.214.190:27015', inline: true },
        )
        interaction.reply({ embeds: [IP], ephemeral: true });
    }
}