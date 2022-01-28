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

    if (!["create"].includes(customId)) return;

   
  
 const int1 = new MessageEmbed()
      .setAuthor(({ name: `${member.user.username}` }))
      .setColor('BLUE')
    

    const Buttons1 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('ticket')
          .setLabel('Открыть')
          .setStyle('DANGER'),
        new MessageButton()
          .setCustomId('rp1')
          .setLabel('Отменить')
          .setStyle('SECONDARY')
      );
      
      

    const Me1 = await interaction.reply({ 
    content: "Вы уверены, что хотите открыть этот билет?", 
    components: [Buttons1],
    ephemeral: true})

    i
    if (!["rp1"].isMessageButton()) return;

  }
}