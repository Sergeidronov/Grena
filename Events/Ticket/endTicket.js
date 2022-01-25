const DB = require("../../Memory/Schems/Tickets");
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     */

    async execute(interaction) {

        const { guild, member} = interaction

const Dataa = await DB.findOne({
    GuildID: guild.id,
    MembersID: member.id,
    Closed: false,
  });
  if (Dataa)
    return interaction.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `You have a ticket open already.`
          )
          .setColor("RED"),
      ],
      ephemeral: true,
    });
 }}