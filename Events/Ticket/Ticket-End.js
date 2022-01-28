const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const DB = require('../../Memory/Schems/TicketDB');
const TicketSetupData = require('../../Memory/Schems/TicketSetupDB');

module.exports = {
  name: 'interactionCreate',
  /**
   * 
   * @param {ButtonInteraction} interaction 
   */
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const { guild, customId, channel, member } = interaction;

    if (!["close"].includes(customId)) return;

   
  
 const int = new MessageEmbed()
      .setAuthor(({ name: `${member.user.username}` }))
      .setColor('BLUE')
    

    const Buttons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('rip')
          .setLabel('Close')
          .setStyle('DANGER'),
        new MessageButton()
          .setCustomId('rp')
          .setLabel('Cancel')
          .setStyle('SECONDARY')
      );
      
    const Me = await interaction.followUp({ content: "Are you sure you would like to close this ticket?", components: [Buttons] })


  }
}