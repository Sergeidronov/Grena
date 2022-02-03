const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const DB = require('../../Memory/Schems/TicketDB2');
const TicketSetupData = require('../../Memory/Schems/TicketSetupDB2');

module.exports = {
  name: 'interactionCreate',
  /**
   * 
   * @param {ButtonInteraction} interaction 
   */
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const { guild, customId, channel, member } = interaction;

    if (!["create1"].includes(customId)) return;

   
  
 const int1 = new MessageEmbed()
      .setAuthor(({ name: `${member.user.username}` }))
      .setColor('BLUE')
    

    const Buttons1 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('ticketbw')
          .setLabel('Открыть')
          .setStyle('DANGER'),
      );
      
      

    const Me1 = await interaction.reply({ 
    content: "Вы уверены, что хотите открыть этот билет?", 
    components: [Buttons1],
    ephemeral: true})

  }
}