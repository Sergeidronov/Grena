const { CommandInteraction, Client } = require("discord.js");
const config = require("../../Structures/config.json");

module.exports = {
  name: "restart",
  description: "Restart Bot",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { guild, member } = interaction;
    if (!config.ownerIDS.includes(member.id)) {
      return interaction.reply({
        content: "You do not have permission to restart this bot",
      });
    }
    await interaction
      .reply({ content: "Restarting..." })
      .then(() => {
        client.destroy();
        console.log(
          `[Client] Restarting by ${member.user.username} in ${guild.name}`
        );
      })
      .then(() => {
        client.login(token);
        console.log("[Client] Ready");
      });
  },
};
