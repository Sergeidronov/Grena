const { 
    ButtonInteraction, 
    MessageEmbed, 
    MessageActionRow, 
    MessageButton
} = require('discord.js');
const DB = require('../../Memory/Schems/TicketDB2');
const TicketSetupData = require('../../Memory/Schems/TicketSetupDB2');

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


      if(!["ticketbw"].includes(customId)) return;

     const data = DB.findOne({ GuildID: guild.id })
const ID = ((await data.countDocuments()) + 1).toString();    
const h = await DB.findOne({ MembersID: member.id, GuildID: guild.id, Closed: false }) 
if(h) return interaction.reply({content: ">Лимит жалоб достигнут, у вас уже открыта жалоба", ephemeral: true})
        await guild.channels
        .create(`${customId + '-' + ID }` ,{
            type: 'GUILD_TEXT',
            parent: Data.Category,
            permissionOverwrites: [
                {
                    id: member.id, 
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', "ATTACH_FILES"]
                },
                {   id: Data.Handlers,
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
                ClaimedBy: "Никто не принял эту жалобу"
            });
      
            const Embed = new MessageEmbed()
            .setAuthor(({name: `${member.user.username}`, iconURL: `${member.displayAvatarURL({ dynamic: true })}`}))
            .setTitle("Форма подачи жалобы:")
            .setDescription(`
            1. Дискорд нарушителя
            2. Пункт правил которые были нарушены/Описание нарушения
            3. Доказательства (Скрин,видео и т.д)

            Если нарушение не критичное, модерация сервера может его отклонить.
            
            `)

            
            
            .setColor('#2C2F33')
    
        
            const Buttons = new MessageActionRow();
            Buttons.addComponents(
                new MessageButton()
                .setCustomId('claim1')
                .setLabel('Принять')
                .setStyle('PRIMARY')
                .setEmoji('🔒'),
                new MessageButton()
                .setCustomId('close1')
                .setLabel('Закрыть')
                .setStyle('SECONDARY')
                .setEmoji('🔒')
            );
    await interaction.deferReply({ ephemeral: true });

    await wait (1000)
            channel.send({content: `${member} `, embeds: [Embed], components: [Buttons]});
    
           await interaction.editReply({content: `${member} ${channel}`, ephemeral: true})

        });
        
    },
};
