const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const DB = require("../../Memory/Schems/Tickets");
const TicketSetupData = require("../../Memory/Schems/TicketSetup");



module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;
        const { guild, customId, channel, member } = interaction;
        if (!["close", "lock", "unlock", "claim"].includes(customId)) return;
 
        const TicketSetup = await TicketSetupData.findOne({GuildID: guild.id});
        if(!TicketSetup)
        return interaction.reply({
            content: "Данные для этой системы устарели.",
        });

        if (!member.roles.cache.find((r) => r.id === TicketSetup.Handlers))
        return interaction.reply({ 
            content: "Недостаточно прав для использования.",
            ephemeral: true,
});
    



        const Embed = new MessageEmbed().setColor("BLUE");

        DB.findOne({ ChannelID: channel.id }, async(err, docs) => {
            if (err) throw err;
            if (!docs) return interaction.reply({
                content: "Никаких данных, связанных с этим билетом, найдено не было, пожалуйста, удалите руководство,",
                ephemeral: true,
            });
            switch (customId) {
                case "lock":
                    if (docs.Locked == true)
                        return interaction.reply({
                            content: "Этот тикет уже закрыт",
                            ephemeral: true,
                        });
                    await DB.updateOne({ ChannelID: channel.id }, { Locked: true });
                    Embed.setDescription("🔒 | Тикет был закрыт");
                    
                    docs.MembersID.forEach((m) => {
                        channel.permissionOverwrites.edit(m, {
                            SEND_MESSAGES: false,
                        });

                    })



                    interaction.reply({ embeds: [Embed] });
                    break;
                case "unlock":
                    if (docs.Locked == false)
                        return interaction.reply({
                            content: "Этот тикет уже открыт",
                            ephemeral: true,
                        });
                    await DB.updateOne({ ChannelID: channel.id }, { Locked: false });
                    
                    Embed.setDescription("🔓 | Тикет был открыт");
                    docs.MembersID.forEach((m) => {
                        channel.permissionOverwrites.edit(m, {
                            SEND_MESSAGES: true, 
                        });

                    })
                    interaction.reply({ embeds: [Embed] });
                    break;
                case "close":
                    if (docs.Closed == true)
                        return interaction.reply({
                             content: "Тикет уже закрыт, пожалуйста подождите", 
                             ephemeral: true, });
                    const attachment = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `${docs.Type} - ${docs.TicketID}.html`,
                    });
                    await DB.updateOne({ ChannelID: channel.id }, { Closed: true });

                    const MEMBER = guild.members.cache.get(docs.MemberID);
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
                    name: "Тип",
                    value: `${docs.Type}`,
                    inline: true,
                  },
                  {
                    name: "Открыл",
                    value: `<@!${docs.MembersID[0]}>`,
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
                    value: `<@!${docs.ClaimedBy}>`,
                    inline: true,
                  },
                ]),
              ],
              files: [attachment],
            });
            

                    interaction.reply({
                        embeds: [Embed.setDescription(
                            `The transcripts save [TRANSCRIPTS](${Message.url})`
                        ),
                    ]
                    })

                    setTimeout(() => {
                        channel.delete();
                    }, 10 * 1000);
                    break;

                    case "claim":
                        if(docs.Claimed == true) 
                            return interaction.reply({content: `Этот тикет уже был принят <@${docs.ClaimedBy}>`,
                            ephemeral: true,
                        });

                        await DB.updateOne({ChannelID: channel.id}, {Claimed: true, ClaimedBy: member.id});

                        Embed.setDescription(`🛄 | Тикет был принят ${member}`);
                        interaction.reply({embeds: [Embed]});
                        
                        break;
            }
            const Dataa = await DB.findOne({
                GuildID: guild.id,
                MembersID: member.id,
                Closed: false,
              });
              if (Dataa)
                return interaction.reply({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        `You have a ticket open already.`
                      )
                      .setColor("RED"),
                  ],
                  ephemeral: true,
                });
        });
    },
};