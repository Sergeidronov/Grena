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
            new MessageButton()
            .setURL("https://discord.com/api/oauth2/authorize?client_id=928621769827442708&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A53134&scope=bot%20applications.commands")
            .setLabel("Invite link")
            .setStyle("LINK"),



            
        );
        interaction.reply({ embeds: [Invite], components: [row] });
    }
};