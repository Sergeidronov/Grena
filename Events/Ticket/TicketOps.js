const {ButtonInteraction, MessageEmbed} =require("discord.js");
const {createTranscript} = require("discord-html-transcripts");
const   {TRANSCRIPTSID } = require("../../Structures/config.json");
const DB = require("../../Memory/Schemas/tickets");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;
        const {guild, customId, channel, member} = interaction;
        if(!["close", "lock", "unlock"].includes(customId)) return;

        const Embed = new MessageEmbed().setColor("BLUE");

        DB.findOne({ ChannelID: channel.id}, async(err, docs) => {
            if(err) throw err;
            if(!docs) return interaction.reply({content: "No data was found", ephemeral: true});
            switch(customId) {
                case "lock" :
                    if(docs.Locked == true)
                    return interaction.reply({content: "The ticket is alde locked", ephemeral: true});
                    await DB.updateOne({ChannelID: channel.id}, {Locked: true});
                    Embed.setDescription("This Ticket is now locked");
                    channel.permissionOverwrites.edit(docs.MemberID, {
                        SEND_MESSAGES: false,
                    });
                    interaction.reply({embeds: [Embed]});
                    break;
                case "unlock":
                    if(docs.Locked == false)
                    return interaction.reply({content: "The ticket is alde unlocked", ephemeral: true});
                    await DB.updateOne({ChannelID: channel.id}, {Locked: false});
                    Embed.setDescription("This Ticket is now unlocked");
                    channel.permissionOverwrites.edit(docs.MemberID, {
                        SEND_MESSAGES: true,
                    });
                    interaction.reply({embeds: [Embed]});
                    break;
                    case "close":
                        if(docs.Closed == true)
                        return interaction.reply({content: "Ticked closed", ephemeral: true});
                        const attachment = await createTranscript(channel, {
                            limit: -1,
                            returnBuffer: false,
                            fileName: `${docs.Type} - ${docs.TicketID}.html`,
                        });
                        await DB.updateOne({ChannelID: channel.id } , {Closed: true});

                        const MEMBER = guild.member.cache.get(docs.MemberID);
                        const Message = await guild.channels.get(TRANSCRIPTSID).send({
                            embeds: [
                                Embed.setAuthor(
                                    MEMBER.user.tag, 
                                    MEMBER.user.displayAvatarURL({dynamic: true}
                                        ).setTitle(`Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`))
                                    ],
                                    files: [attachment],
                        });
                        interaction.reply({embeds: [Embed.setDescription(`The transcript is now saved [TRANSCRIPT](${Message.url})`)]})
                        setTimeout(function () {
                            channel.delete()
                        }, 10* 1000);
                    
            }
        });

    },
};