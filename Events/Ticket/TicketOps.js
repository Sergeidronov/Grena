const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const DB = require("../../Memory/Schems/Tickets");
const TicketSetupData = require("../../Memory/Schems/TicketSetup");

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
      if(!interaction.isButton()) return;
      const { guild, customId, channel, member } = interaction;
      if(!["close", "lock", "unlock", "claim"].includes(customId)) return;

      const TicketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
      if(!TicketSetup)
          return interaction.reply({
              content: "The data for this system is outdated.",
          });

      if(!member.roles.cache.find((r) => r.id === TicketSetup.Handlers))
          return interaction.reply({
              content: "You cannot use these buttons.",
              ephemeral: true,
          });

        const Embed = new MessageEmbed()
        .setColor('BLUE')

        DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
            if(err) throw err;
            if(!docs) return interaction.reply({content: 'You cannot create another Ticket, please close the current one or use the same ticket.', ephemeral: true});
            switch (customId) {
                case 'close': 
                if(docs.Closed == true)
                return interaction.reply({content: 'Ticket is already closed', 
                ephemeral: true 
                });
                const attachment = await createTranscript(channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${docs.Type} = ${docs.TicketID}.html`,
                });
                await DB.updateOne({ Channel: channel.id }, { Closed: true });

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
                        name: "Type",
                        value: `${docs.Type}`,
                        inline: true,
                      },
                      {
                        name: "Opened By",
                        value: `<@!${docs.MembersID}>`,
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
                        value: `<@!${docs.ClaimedBy}>`,
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
                        .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true})}`})
                    ],
                });

                setTimeout(() => {
                    channel.delete();
                }, 5 * 1000);
                break;
                case 'claim' :
                    if(docs.Claimed == true) 
                        return interaction.reply({ 
                            content: `❌ | This ticket has alredy been claimed by <@${docs.ClaimeBy}>`,
                            ephemeral: true,
                         });
                    
                         await DB.updateOne(
                             {ChannelID: channel.id}, 
                             {Claimed: true, ClaimedBy: member.id}
                        );
                        Embed
                        .setAuthor(({name: `${member.user.username}`, iconURL: `${member.displayAvatarURL({ dynamic: true })}`}))
                        .setTitle('✅ | Claimed Ticket.')
                        .setColor('#2C2F33')
                        .setDescription(`${member} has claimed the ticket`)
                        .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true})}`})

                        interaction.reply({ embeds: [Embed] });

                    break;

            }
        }); 


    },

};