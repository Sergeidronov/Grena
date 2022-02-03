const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');

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
    const { guild, customId, channel, member, message } = interaction;

    if (!['cl', 'oen', 'del', `claim` ].includes(customId)) return;

    const TicketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
    if (!TicketSetup)
      return interaction.reply({
        content: 'Данные для этой системы устарели.',
      });

    if (!member.roles.cache.find((r) => r.id === TicketSetup.Handlers))
      return interaction.reply({
        content: '❌ | Вы не можете использовать эти кнопки.',
        ephemeral: true,
      });

    const Embed = new MessageEmbed()
      .setColor('BLUE')

    DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
      if (err) throw err;
      if (!docs) return interaction.reply({ content: 'Вы не можете создать другой тикет, пожалуйста, закройте текущий или используйте тот же билет.', ephemeral: true });

      switch (customId) {
        case 'del':
          const attachment = await createTranscript(channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `ticket - ${docs.TicketID}.html`,
          });
          
          await DB.updateOne({ Channel: channel.id }, { Deleted: true });

          const Message = await guild.channels.cache
            .get(TicketSetup.Transcripts)
            .send({
              embeds: [
                Embed.setTitle(`Тикет закрыт`).addFields([
                  {
                    name: "Тикет айди",
                    value: `${docs.TicketID}`,
                    inline: true,
                  },
                  {
                    name: "Открыл",
                    value: `<@${docs.MembersID}>`,
                    inline: true,
                  },
                  {
                    name: "Время открытия",
                    value: `<t:${docs.OpenTime}:R>`,
                    inline: true,
                  },
                  {
                    name: "Время закрытия",
                    value: `<t:${parseInt(Date.now() / 1000)}:R>`,
                    inline: true,
                  },
                  {
                    name: "Принял",
                    value: `<@${docs.ClaimedBy}>`,
                    inline: true,
                  },
                ]),
              ],
              files: [attachment],
            });


          interaction.reply({
            embeds: [Embed.setTitle('Тикет закрыт 🔒'
            )
              .setDescription(`Тикет закрыт \n[TRANSCRIPTS](${Message.url})`)
              .setColor('#2C2F33')
              .setFooter({ text: `${interaction.guild.name}` })
            ]
          });

          setTimeout(() => {
            channel.delete();
          }, 5 * 1000);
          break;
        case 'cl':
          if (docs.Claimed == true)
            return interaction.reply({
              content: `❌ | Этот билет уже был принят <@${docs.ClaimeBy}>`,
              ephemeral: true,
            });

          await DB.updateOne(
            { ChannelID: channel.id },
            { Claimed: true, ClaimedBy: interaction.user.id }
          );
          Embed
            .setAuthor(({ name: `${member.user.username}` }))
            .setTitle('✅ | Тикет принят.')
            .setColor('#2C2F33')
            .setDescription(`${member} принял тикет`)
            .setFooter({ text: `${interaction.guild.name}` })

          interaction.reply({ embeds: [Embed] });

          break;
           case 'oen':
           if(docs.Closed == false)
           return interaction.reply("Этот билет уже открыт")

          await DB.updateOne({ ChannelID: channel.id }, { Closed: false })
          docs.MembersID.forEach((m) => {
            channel.permissionOverwrites.edit(m, {
              VIEW_CHANNEL: true,
            })
          })

          const GD = new MessageEmbed()
            .setDescription(`Билет был открыт ${interaction.user}`)



          await interaction.reply({ embeds: [Embed.setDescription(`Этот билет теперь открыт ${interaction.user}`)] })
          setTimeout(() => { message.delete() }, 2);
          break;
        case 'claim':
          if (docs.Claimed == true)
            return interaction.reply({
              content: `❌ | Этот билет уже был принят <@${docs.ClaimeBy}>`,
              ephemeral: true,
            });
        
          await DB.updateOne(
            { ChannelID: channel.id },
            { Claimed: true, ClaimedBy: interaction.user.id }
          );
          Embed
            .setTitle('✅ | Тикет принят')
            .setColor('#2C2F33')
            .setDescription(`${member} принял этот тикет`)
        
          interaction.reply({ embeds: [Embed] });

      }
    });


  },

};