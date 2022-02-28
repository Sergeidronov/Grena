const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "embedbuilder",
    description: "Permet de cree un embed",
    permissions: "ADMINISTRATOR",
    options: [
        {
            name: "title",
            description: "Choisi le titre de l'embed",
            type: "STRING",
            required: false
        },
        {
            name: "description",
            description: "Choisi la description de l'embed",
            type: "STRING",
            required: false
        },
        {
            name: "footer",
            description: "Choisi le footer de l'embed",
            type: "STRING",
        },
        {
            name: "color",
            description: "Choisi la couleur de l'embed",
            type: "STRING",
            required: false
        },
        {
            name: "channel",
            description: "Sélectionner le salon ou l'embed sera envoyer",
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
        
        interaction.reply({ content : "Votre embed a été envoyé !", ephemeral : true})
        channel.send({ embeds: [embed] })
        
    }
}