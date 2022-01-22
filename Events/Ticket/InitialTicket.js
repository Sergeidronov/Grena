const {
    ButtonInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const DB = require("../../Memory/Schems/Tickets");
const TicketSetupData = require("../../Memory/Schems/TicketSetup")
module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     */

    async execute(interaction) {
        if(!interaction.isButton()) return;
        const { guild, member, customId} = interaction


        const Data = await TicketSetupData.findOne({GuildID: guild.id});
        if(!Data) return;

        if(!Data.Buttons.includes (customId)) return;

        const ID = Math.floor(Math.random() * 90000) + 10000;

        await guild.channels.create(`${customId + "-" + ID}`, {
            type: "GUILD_TEXT",
            parent: Data.Category,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                },
                { 
                    id: Data.Handlers,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]  
                },
                {
                    id: Data.Everyone,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                },
            ],
        })
        .then(async (channel) => {
            await DB.create({
              GuildID: guild.id,
              MembersID: member.id,
              TicketID: ID,
              ChannelID: channel.id,
              Closed: false,
              Locked: false,
              Type: customId,
              Claimed: false,
              OpenTime: parseInt(channel.createdTimestamp / 1000),
            });

            const Embed = new MessageEmbed()
            .setAuthor({ name: 
                `${guild.name} | Ticket: ${ID}`,
                iconURL: guild.iconURL({dynamic: true})},
            )
            .setDescription("Please wait patiently for a response from the Staff")
            .setFooter({text: "The button"})

    
            const Buttons = new MessageActionRow();
            
            Buttons.addComponents(
                new MessageButton()
                .setCustomId("close")
                .setLabel("Save & Close Ticket  ")
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
                new MessageButton()
                .setCustomId("claim")
                .setLabel("Claim")
                .setStyle("PRIMARY")
                .setEmoji("😈"),
    
    
            );
    
            channel.send({ 
             embeds: [Embed], 
             components: [Buttons],
            });

                
             await channel
             .send({content: `${member} test`})
             .then((m) =>{
                 setTimeout(() => {
                     m.delete().catch(() => {});
                 }, 1 * 5000);
             });

             interaction.reply({
                content: `${member} your ticket has been created ${channel}`, 
                ephemeral: true, 
              });


        });
    },
};

