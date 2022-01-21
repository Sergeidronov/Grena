const {
    ButtonInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const DB = require("../../Memory/Schemas/tickets");
const {PARENTID, EVERYONEID} = require("../../Structures/config.json");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     */

    async execute(interaction) {
        if(!interaction.isButton()) return;
        const { guild, member, customId} = interaction

        if(!["player", "bug", "other"].includes(customId)) return;

        const ID = Math.floor(Math.random() * 90000) + 10000;

        await guild.channels.create(`${customId + "-" + ID}`, {
            type: "GUILD_TEXT",
            parent: PARENTID,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                },
                {
                    id: EVERYONEID,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                },
            ],
        })
        .then(async(channel) => {
            await DB.create({
                GuildID: guild.id,
                MemberID: member.id,
                TicketID: ID,
                ChannelID: channel.id,
                Closed: false,
                Locked: false,
                type: customId,
            });

            const Embed = new MessageEmbed()
            .setAuthor(`${guild.name} | Ticket: ${ID}`,
            guild.iconURL({dynamic: true})
            )
            .setDescription("Please wait patiently for a response from the Staff")
            .setFooter("The button")
    
            const Buttons = new MessageActionRow();
    
            Buttons.addComponents(
                new MessageButton()
                .setCustomId("close")
                .setLabel("Save")
                .setStyle("PRIMARY")
                .setEmoji("😀"),
                new MessageButton()
                .setCustomId("lock")
                .setLabel("Lock")
                .setStyle("SECONDARY")
                .setEmoji("😇"),
                new MessageButton()
                .setCustomId("unlock")
                .setLabel("Unlock")
                .setStyle("SUCCESS")
                .setEmoji("😈"),
    
            );
    
            channel.send({ 
             embeds: [Embed], 
             components: [Buttons],
            });

                
             await channel
             .send({content: `${member} Here choto`})
             .then((m) =>{
                 setTimeout(() => {
                     m.delete().catch(() => {});
                 }, 1 * 5000);
             });

        });
    },
};

