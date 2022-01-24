const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");

const DB = require("../../Memory/Schems/Tickets");
const TicketSetupData = require("../../Memory/Schems/TicketSetup");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param { ButtonInteraction } interaction
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

        const Embed = new MessageEmbed().setColor("BLUE");

        DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
            if (err) throw err;
            if(!docs)
            return interaction.reply({
                content:
                "No data was found related to this ticket, please delete manual,",
                ephemeral: true
            });
        switch(customId) {
            case "lock" : 
             if (docs.locked == true)
                return interaction.reply({
                    content: "The ticket is already locked",
                    ephemeral: true
                });
            await DB.updateOne({ ChannelID: channel.id }, { Locked: true });
            Embed.setDescription("🔒 | This ticket is now locked for reviewing.");
            channel.permissionOverwrites.edit(docs.MemberID, {
                SEND_MESSAGES: false,
            });
            interaction.reply({ embeds: [Embed] });
            break;
            case "unlock" :
                if (docs.locked == false)
                return interaction.reply({
                    content: "The ticket is already unlocked",
                    ephemeral: true
                });
            await DB.updateOne({ ChannelID: channel.id }, { Locked: false });
            Embed.setDescription("🔓 | This ticket is now unlocked.");
            channel.permissionOverwrites.edit(docs.MemberID, {
                SEND_MESSAGES: true,
            });
            interaction.reply({ embeds: [Embed] });
            break;
            case "close" :
                if (docs.Closed == true)
                return interaction.reply({
                    content: 
                    "Ticket is already closed, please wait for it to get deleted",
                    ephemeral: true,
                });
                const attachment = await createTranscript(channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${docs.Type} - ${docs.TicketID}.html`,
                });
                await DB.updateOne({ ChannelID: channel.id }, { Close: true });

                const Message = await guild.channels.cache.get(TRANSCRIPTSID).send({
                    embeds: [
                        Embed.setTitle(`Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`),
                    ],
                    files: [attachment],
                });

                interaction.reply({ 
                    embeds: [
                      Embed.setDescription(
                        `The transcript is now saved [TRANSCRIPT](${Message.url})`
                        ),
                    ], 
                });

                setTimeout(() => {
                    channel.delete();
                }, 10 * 1000);
            }
        });
    },
}