const {
    ButtonInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton
  } = require('discord.js');
  const DB = require('../../Memory/Schems/TicketDB2');
  const TicketSetupData = require('../../Memory/Schems/TicketSetupDB2');
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
  
      if (!["rip1", "rp1"].includes(customId)) return;
      
      
  
      const Buttons = new MessageActionRow();
      Buttons.addComponents(
        new MessageButton()
          .setCustomId('oen1')
          .setLabel('Открыть')
          .setStyle('SECONDARY')
          .setEmoji('🔓'),
       
        new MessageButton()
          .setCustomId('del1')
          .setLabel('Удалить')
          .setStyle('SECONDARY')
          .setEmoji('⛔'),
  
      );
      const YH = new MessageEmbed()
        .setColor("#36393f")
        .setDescription('\`\`\`Панель контроля\`\`\`')
      const Embed = new MessageEmbed()
  
      DB.findOne({ ChannelID: channel.id }, async (err, data) => {
        if (err) throw err;
        if (!data) return interaction.reply("Нет данных в базе")
  
        switch (customId) {
          case "rip1":
            if (data.Closed == true)
              return interaction.reply({ embeds: [Embed.setDescription("Эта жалоба уже открыта")], ephemeral: true })
            await DB.updateOne({ ChannelID: channel.id }, { Closed: true })
            data.MembersID.forEach((m) => {
              channel.permissionOverwrites.edit(m, {
                VIEW_CHANNEL: false,
              })
            })
  
  
    
            interaction.reply({embeds: [new MessageEmbed()
              .setDescription(`Эту жалобу закрыл ${interaction.user}`)
  ]}) 
  
    setTimeout(() => { message.delete() }, 2);
            await wait(4);
            await interaction.channel.send({ embeds: [YH], components: [Buttons] })
            break;
          case "rp1":
            setTimeout(() => { message.delete() }, 200);
  
            break;
        }
  
  
  //.setDisabled(true);
      })
    }
  }