const {
    MessageEmbed,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
} =require("discord.js");
const { OPENTICKET } = require("../../Structures/config.json");

module.exports = {
    name: "ticket",
    description: "Setup ticket",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction ) {
        const {guild} = interaction;

        const Embed = new MessageEmbed() 
        .setTitle(
            guild.name + " | Ticketing system",
            guild.iconURL({dynamic: true})
        )
        .setDescription(
            "Open ticket"
        )
        .setColor("RED");

        const Buttons = new MessageActionRow()

        Buttons.addComponents(
            new MessageButton()
            .setCustomId("player")
            .setLabel("player report")
            .setStyle("PRIMARY")
            .setEmoji("😀"),
            new MessageButton()
            .setCustomId("bug")
            .setLabel("bug")
            .setStyle("SECONDARY")
            .setEmoji("😇"),
            new MessageButton()
            .setCustomId("other")
            .setLabel("Bug")
            .setStyle("SUCCESS")
            .setEmoji("😈"),

        );
        await guild.channels.cache.get(OPENTICKET)
        .send({embeds: [Embed], components: [Buttons]});

        interaction.reply({content: "Done", ephemeral: true});
    },
};

