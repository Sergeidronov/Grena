const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "changelog",
    description: "Shows the latest changes in the bot.",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { member } = interaction;

        const bVersion = "1.0.0";

        const embed = new MessageEmbed()
            .setTitle("📜 Change Log for " + client.user.username)
            .setDescription("The latest changes in the bot.")
            .setColor(0x00ff00)
            .setDescription(`Current **Bot Version**: __${bVersion}__`)
            .addField("1.0.0", "Added a new command: `poll`", true)
            .setFooter(`Requested by ${member.displayName}`, member.user.displayAvatarURL())
            .setTimestamp();

            interaction.reply({embeds: [embed], ephemeral: true});
    }
}