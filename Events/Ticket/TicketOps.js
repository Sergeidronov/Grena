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
 
        const TicketSetup = await TicketSetupData.findOne({GuildID: guild.id});
        if(!TicketSetup)return interaction.reply({content: "The data for this system outdated"});

        if (!member.roles.cache.find((r) => r.id === TicketSetup.Handlers))
        return interaction.editReply({ 
            content: "You cannot use button.",
            ephemeral: true,
});
        if (!["close", "lock", "unlock", "claim"].includes(customId)) return;

        const Embed = new MessageEmbed().setColor("BLURPLE");
        DB.findOne({ ChannelID: channel.id }, async(err, docs) => {
            if (err) throw err;
            if (!docs) return interaction.reply({
                content: "No data was found related to this ticket, please delete manual",
                ephemeral: true,
            });
            switch (customId) {
                case "lock":
                    if (docs.Locked == true)
                        return interaction.reply({
                            content: "This ticket is already locked",
                            ephemeral: true,
                        });
                    await DB.updateOne({ ChannelID: channel.id }, { Locked: true });
                    Embed.setDescription("🔒 | This ticket is now locked");
                    
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
                            content: "This ticket is already unlocked",
                            ephemeral: true,
                        });
                    await DB.updateOne({ ChannelID: channel.id }, { Locked: false });
                    
                    Embed.setDescription("🔓 | This ticket is now unlocked");
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
                             content: "Ticket is already closed please wait!", 
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
                    value: `<@!${docs.MembersID[0]}>`,
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
                            return interaction.reply({content: `This ticket has already been claimed by <@${docs.ClaimedBy}>`,
                            ephemeral: true,
                        });

                        await DB.updateOne({ChannelID: channel.id}, {Claimed: true, ClaimedBy: member.id});

                        Embed.setDescription(` | This thicket is now claimed by ${member}`);
                        interaction.reply({embeds: [Embed]});
                        
                        break;
            }
        });
    },
};