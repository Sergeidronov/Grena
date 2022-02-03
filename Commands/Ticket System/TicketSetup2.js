const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js')
const DB = require('../../Memory/Schems/TicketSetupDB2')

module.exports = {
  name: "ticket-setup2",
  description: "Установка тикет системы",
  permission: "ADMINISTRATOR",
  usage: "/ticket-setup2",
  options: [
    {
      name: "channel",
      description: "Канал для тикет системы",
      required: true,
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
    },
    {
      name: "category",
      description: "Категория отправки тикетов",
      required: true,
      type: "CHANNEL",
      channelTypes: ["GUILD_CATEGORY"],
    },
    {
      name: "transcripts",
      description: "Отправка транскрипций ",
      required: true,
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
    },
    {
      name: "handlers",
      description: "Тикет хелперы",
      required: true,
      type: "ROLE",
    },
  ],
   /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
      const { guild, options } = interaction;
      

    try {
     const Channel1 = options.getChannel("channel")
     const Category1 = options.getChannel("category") 
     const Transcripts1 = options.getChannel("transcripts")
     const Handlers1 = options.getRole("handlers")
     

     await DB.findOneAndUpdate(
     {GuildID: guild.id}, 
     { 
     Channel: Channel1.id,
     Category: Category1.id,
     Transcripts: Transcripts1.id, 
     Handlers: Handlers1.id,
     Everyone: guild.id,
     },
     {
       new: true,
       upsert: true
     }
     );
     const Embed = new MessageEmbed() 
     .setAuthor({name: "Подача жалобы", iconURL: guild.iconURL({dynamic: true})})
     .setDescription(`
     **В данном канале вы можете оставить жалобу на нарушения администрации сервера Big Wars Life**.

     **Для подачи жалобы нажмите на**  📬
     `)
     .setFooter({text: "За создание ложной жалобы вы можете получить наказание."})
     .setColor("#36393f")
     const Buttons = new MessageActionRow()
     .addComponents(
       new MessageButton()
       .setLabel("📬 Создать жалобу")
       .setCustomId("create1")
       .setStyle("SECONDARY")
     )
     await guild.channels.cache.get(Channel1.id).send({embeds: [Embed], components: [Buttons]})

     interaction.reply({content: `Ваша тикет система создана в <#${Channel1.id}>`, ephemeral: true})


    } catch (err){
 console.log(err)
    }
    
    }
}