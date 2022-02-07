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
            .setAuthor(({name: `${member.user.username} [${member.user.id}]`, iconURL: `${member.displayAvatarURL({ dynamic: true })}`}))
            .setTitle("Форма подачи жалобы:")
            .setDescription(`
            **1. Ваш Ник на сервере**
            **2. Ник Администратора и его SteamID**
            **3. Какое было нарушение было замечено со стороны Администратора**
            **4. Доказательства (Скрин,видео)**`)
            .setFooter({text: "Если нарушение не критичное, модерация сервера может его отклонить."})
            .setColor('GREEN')

    
        
            const Buttons = new MessageActionRow();
            Buttons.addComponents(
                new MessageButton()
                .setCustomId('claim1')
                .setLabel('Принять')
                .setStyle('PRIMARY')
                .setEmoji('🔒'),
                new MessageButton()
                .setCustomId('del1')
                .setLabel('Закрыть')
                .setStyle('DANGER')
                .setEmoji('🔒')
            );
    await interaction.deferReply({ ephemeral: true });

    await wait (1000)
            channel.send({content: `${member} `, embeds: [Embed], components: [Buttons]});
    
           await interaction.editReply({content: `${member} вы можете оставить свою жалобу в канале ${channel}`, ephemeral: true})

        });
        
    },
};
