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
          .setLabel('Закрыть')
          .setStyle('DANGER'),
        new MessageButton()
          .setCustomId('rp')
          .setLabel('Отменить')
          .setStyle('SECONDARY')
      );
      
    const Me = await interaction.reply({ content: "Вы уверены, что хотели бы закрыть этот билет?", components: [Buttons] })


  }
}