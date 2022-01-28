const {
    ButtonInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton
  } = require('discord.js');
  const DB = require('../../Memory/Schems/TicketDB');
  const TicketSetupData = require('../../Memory/Schems/TicketSetupDB');
  const wait = require('util').promisify(setTimeout);
  
  module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
      if (!interaction.isButton()) return;
  
      const { guild, member, customId, message, channel } = interaction;
  
      if (!["rip", "rp"].includes(customId)) return;
  
      const Buttons = new MessageActionRow();
      Buttons.addComponents(
        new MessageButton()
          .setCustomId('oen')
          .setLabel('Открыть')
          .setStyle('SECONDARY')
          .setEmoji('🔓'),
       
        new MessageButton()
          .setCustomId('del')
          .setLabel('Удалить')
          .setStyle('SECONDARY')
          .setEmoji('⛔'),
  
      );
      const YH = new MessageEmbed()
        .setColor("#36393f")
        .setDescription('\`\`\`Команда поддержки контролирует тикет\`\`\`')
      const Embed = new MessageEmbed()
  
      DB.findOne({ ChannelID: channel.id }, async (err, data) => {
        if (err) throw err;
        if (!data) return interaction.reply("No Data In Database")
  
        switch (customId) {
          case "rip":
            if (data.Closed == true)
              return interaction.reply({ embeds: [Embed.setDescription("Этот билет уже открыт")], ephemeral: true })
            await DB.updateOne({ ChannelID: channel.id }, { Closed: true })
            data.MembersID.forEach((m) => {
              channel.permissionOverwrites.edit(m, {
                VIEW_CHANNEL: false,
              })
            })
  
  
    
            interaction.reply({embeds: [new MessageEmbed()
              .setDescription(`This Ticket Is Now Closed By ${interaction.user}`)
  ]}) 
  
    setTimeout(() => { message.delete() }, 2);
            await wait(4);
            await interaction.channel.send({ embeds: [YH], components: [Buttons] })
            break;
          case "rp":
            setTimeout(() => { message.delete() }, 200);
  
            break;
        }
  
  
  //.setDisabled(true);
      })
    }
  }