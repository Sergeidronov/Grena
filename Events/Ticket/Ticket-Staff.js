const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');

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
    const { guild, customId, channel, member, message } = interaction;

    if (!['cl', 'oen', 'del'].includes(customId)) return;

    const TicketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
    if (!TicketSetup)
      return interaction.reply({
        content: 'The data for this system is outdated.',
      });

    if (!member.roles.cache.find((r) => r.id === TicketSetup.Handlers))
      return interaction.reply({
        content: '❌ | You cannot use these buttons.',
        ephemeral: true,
      });

    const Embed = new MessageEmbed()
      .setColor('BLUE')

    DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
      if (err) throw err;
      if (!docs) return interaction.reply({ content: 'You cannot create another Ticket, please close the current one or use the same ticket.', ephemeral: true });

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
                Embed.setTitle(`Ticket Closed`).addFields([
                  {
                    name: "Ticket ID",
                    value: `${docs.TicketID}`,
                    inline: true,
                  },
                  {
                    name: "Opened By",
                    value: `<@${docs.MembersID}>`,
                    inline: true,
                  },
                  {
                    name: "Open Time",
                    value: `<t:${docs.OpenTime}:R>`,
                    inline: true,
                  },
                  {
                    name: "Closed Time",
                    value: `<t:${parseInt(Date.now() / 1000)}:R>`,
                    inline: true,
                  },
                  {
                    name: "Claimed By",
                    value: `<@${docs.ClaimedBy}>`,
                    inline: true,
                  },
                ]),
              ],
              files: [attachment],
            });


          interaction.reply({
            embeds: [Embed.setTitle('Ticket Closed 🔒'
            )
              .setDescription(`Ticket Closed \n[TRANSCRIPTS](${Message.url})`)
              .setColor('#2C2F33')
              .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}` })
            ]
          });

          setTimeout(() => {
            channel.delete();
          }, 5 * 1000);
          break;
        case 'cl':
          if (docs.Claimed == true)
            return interaction.reply({
              content: `❌ | This ticket has alredy been claimed by <@${docs.ClaimeBy}>`,
              ephemeral: true,
            });

          await DB.updateOne(
            { ChannelID: channel.id },
            { Claimed: true, ClaimedBy: interaction.user.id }
          );
          Embed
            .setAuthor(({ name: `${member.user.username}`, iconURL: `${member.displayAvatarURL({ dynamic: true })}` }))
            .setTitle('✅ | Claimed Ticket.')
            .setColor('#2C2F33')
            .setDescription(`${member} has claimed the ticket`)
            .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}` })

          interaction.reply({ embeds: [Embed] });

          break;
           case 'oen':
           if(docs.Closed == false)
           return interaction.reply("This Ticket Is Already Opened")

          await DB.updateOne({ ChannelID: channel.id }, { Closed: false })
          docs.MembersID.forEach((m) => {
            channel.permissionOverwrites.edit(m, {
              VIEW_CHANNEL: true,
            })
          })

          const GD = new MessageEmbed()
            .setDescription(`This Ticket Is Now Opened By ${interaction.user}`)



          await interaction.reply({ embeds: [Embed.setDescription(`This Ticket Is Now Opened By ${interaction.user}`)] })
          setTimeout(() => { message.delete() }, 2);
          break;

      }
    });


  },

};