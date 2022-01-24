const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Ping",
  permission: "ADMINISTRATOR",
  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  execute(interaction) {
    interaction.reply({content: "POING"})

  }
};
