const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const { TRANSCRIPTSID } = require("../../Structures/config.json");
const DB = require("../../Memory/Schems/Tickets");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;
        const { guild, customId, channel, member } = interaction;

        if (!member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You are not able to use these buttons." });
        if (!["close", "lock", "unlock"].includes(customId)) return;

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
                    channel.permissionOverwrites.edit(docs.MemberID, {
                        SEND_MESSAGES: false,
                    });
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
                    channel.permissionOverwrites.edit(docs.MemberID, {
                        SEND_MESSAGES: true,
                    });
                    interaction.reply({ embeds: [Embed] });
                    break;
                case "close":
                    if (docs.Closed == true)
                        return interaction.reply({ content: "Ticket is already closed please wait!", ephemeral: true, });
                    const attachment = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `${docs.Type} - ${docs.TicketID}.html`,
                    });
                    await DB.updateOne({ ChannelID: channel.id }, { Closed: true });

                    const MEMBER = guild.members.cache.get(docs.MemberID);
                    const Message = await guild.channels.cache.get(TRANSCRIPTSID).send({
                        embeds: [
                            Embed.setTitle(`Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`),
                        ],
                        files: [attachment],
                    });

                    setTimeout(() => {
                        channel.delete();
                    }, 10 * 1000);
            }
        });
    },
};