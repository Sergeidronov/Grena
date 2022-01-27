const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");
module.exports = {
    name: "invite",
    description: "Invite me to your server!",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {

        const Invite = new MessageEmbed()
            .setTitle("Invite Me!")
            .setDescription("I'm a cool Discord Bot, ain't I? Use the buttons below to invite me to your server or join our support server!\n\nStay Safe 👋")
            .setColor("YELLOW")
            .setThumbnail(client.user.displayAvatarURL())

        let row = new MessageActionRow().addComponents(

            new MessageButton()
            .setURL("https://discord.gg/7ZPcNJgtzy")
            .setLabel("Support Server")
            .setStyle("LINK"),

        );
        interaction.reply({ embeds: [Invite], components: [row] });
    }
};