const { 
    ButtonInteraction, 
    MessageEmbed, 
    MessageActionRow, 
    MessageButton
} = require('discord.js');
const DB = require('../../Memory/Schems/TicketDB');
const TicketSetupData = require('../../Memory/Schems/TicketSetupDB');

const wait = require('util').promisify(setTimeout);

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;

        const { guild, member, customId } = interaction;

        const Data = await TicketSetupData.findOne({GuildID: guild.id });
        if(!Data) return;

     if(!["create"].includes(customId)) return;
     const data = DB.findOne({ GuildID: guild.id })
const ID = ((await data.countDocuments()) + 1).toString();    
const h = await DB.findOne({ MembersID: member.id, GuildID: guild.id, Closed: false }) 
if(h) return interaction.reply({content: "> **Warning:** Ticket limit reached, You already have 1 tickets open of the 1 allowed for this panel", ephemeral: true})
        await guild.channels.create(`${  'ticket' + '-' + ID }`,{
            type: 'GUILD_TEXT',
            parent: Data.Category,
            permissionOverwrites: [
                {
                    id: member.id, 
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', "ATTACH_FILES"]
                },
                { id: Data.Handlers,
     allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]  },
                {
                    id: Data.Everyone,
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                }
            ],
        }).then(async (channel) => {
            await DB.create({
                GuildID: guild.id,
                MembersID: member.id,
                TicketID: ID,
                ChannelID: channel.id,
                Closed: false,
                Deleted: false,
                Claimed: false,
                OpenTime: parseInt(channel.createdTimestamp / 1000),
                ClaimedBy: "No Body Claimed The Ticket"
            });
      
            const Embed = new MessageEmbed()
            .setAuthor(({name: `${member.user.username}`, iconURL: `${member.displayAvatarURL({ dynamic: true })}`}))
            .setDescription(`Support will be with you shortly.\nTo close this ticket react with 🔒`)
            .setFooter({ text: `Patience Is A Key`})
            .setColor('#2C2F33')
    
        
            const Buttons = new MessageActionRow();
            Buttons.addComponents(
                new MessageButton()
                .setCustomId('claim')
                .setLabel('Claim')
                .setStyle('PRIMARY')
                .setEmoji('🔒'),
                new MessageButton()
                .setCustomId('close')
                .setLabel('Close')
                .setStyle('SECONDARY')
                .setEmoji('🔒')
            );
    await interaction.deferReply({ ephemeral: true });

    await wait (1000)
            channel.send({content: `${member} Welcome`, embeds: [Embed], components: [Buttons]});
    
           await interaction.editReply({content: `${member} ${channel}`, ephemeral: true})
 
                
        });
        
    },
};
