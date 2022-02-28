const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "embedbuilder",
    description: "Permet de cree un embed",
    permissions: "ADMINISTRATOR",
    options: [
        {
            name: "title",
            description: "Выбор вставки",
            type: "STRING",
            required: false
        },
        {
            name: "description",
            description: "Выбор описания вставки",
            type: "STRING",
            required: false
        },
        {
            name: "footer",
            description: "Выбор нижнего колонтитула вставки",
            type: "STRING",
        },
        {
            name: "color",
            description: "Выбор цвета",
            type: "STRING",
            required: false
        },
        {
            name: "channel",
            description: "Выбор канала",
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const {options} = interaction;

        const title = options.getString("title");
        const description = options.getString("description");
        const footer = options.getString("footer");
        const color = options.getString("color");
        const channel = options.getChannel("channel") || interaction.channel;

        const embed = new MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(description)
        .setFooter(footer)
        
        interaction.reply({ content : "Ваша вставка была отправлена !", ephemeral : true})
        channel.send({ embeds: [embed] })
        
    }
}