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

    if (!["del1"].includes(customId)) return;

   
  
 const int = new MessageEmbed()
      .setAuthor(({ name: `${member.user.username}` }))
      .setColor('BLUE')
    

    const Buttons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('rip1')
          .setLabel('Закрыть')
          .setStyle('DANGER'),
      );
      
     
    const Me = await interaction.reply({ content: "Вы уверены, что хотите закрыть эту жалобу?", components: [Buttons], ephemeral: true })


  
  }
}