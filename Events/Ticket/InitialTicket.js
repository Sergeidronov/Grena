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

        if(["players", "bug", "other"].includes(customId)) return;


        const Data = await TicketSetupData.findOne({GuildID: guild.id});
        if(!Data) return;

        if(!Data.Buttons.includes (customId)) return;

        

        const ID = Math.floor(Math.random() * 90000) + 10000;

        await guild.channels
        .create(`${customId + "-" + ID}`, {
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
                `${guild.name} | Тикет: ${ID}`,
                iconURL: guild.iconURL({dynamic: true})},
            )
            .setDescription("Пожалуйста ожидайте ответа от персонала")
            .setFooter({text: "The button"})

    
            const Buttons = new MessageActionRow();
            
            Buttons.addComponents(
                new MessageButton()
                .setCustomId("close")
                .setLabel("Сохранить & Закрыть тикет  ")
                .setStyle("PRIMARY")
                .setEmoji("💾"),
                new MessageButton()
                .setCustomId("lock")
                .setLabel("Закрыть")
                .setStyle("SECONDARY")
                .setEmoji("🔒"),
                new MessageButton()
                .setCustomId("unlock")
                .setLabel("Открыть")
                .setStyle("SUCCESS")
                .setEmoji("🔓"),
                new MessageButton()
                .setCustomId("claim")
                .setLabel("Принять")
                .setStyle("PRIMARY")
                .setEmoji("🛄"),
    
    
            );

            
            
            
            
    
            channel.send({ 
             embeds: [Embed], 
             components: [Buttons],
            });


                
             await channel
             .send({content: `${member} вот ваш билет`})
             .then((m) =>{
                 setTimeout(() => {
                     m.delete().catch(() => {});
                 }, 1 * 5000);
             });

             

             interaction.reply({
                content: `${member} ваш тикет был создан ${channel}`, 
                ephemeral: true, 
              });

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
