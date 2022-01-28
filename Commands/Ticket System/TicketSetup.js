const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js')
const DB = require('../../Memory/Schems/TicketSetupDB')

module.exports = {
  name: "ticket-setup",
  description: "Установка тикет системы",
  permission: "ADMINISTRATOR",
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
     const Channel = options.getChannel("channel")
     const Category = options.getChannel("category") 
     const Transcripts = options.getChannel("transcripts")
     const Handlers = options.getRole("handlers")

     await DB.findOneAndUpdate(
     {GuildID: guild.id}, 
     { 
     Channel: Channel.id,
     Category: Category.id,
     Transcripts: Transcripts.id, 
     Handlers: Handlers.id,
     Everyone: guild.id,
     },
     {
       new: true,
       upsert: true
     }
     );
     const Embed = new MessageEmbed()
     .setAuthor({name: guild.name + " | Ticketing System ", iconURL: guild.iconURL({dynamic: true})})
     .setDescription(`*To Create A Ticket React With*  📬`)
     .setColor("#36393f")

     const Buttons = new MessageActionRow()
     .addComponents(
       new MessageButton()
       .setLabel("📬 Create Ticket")
       .setCustomId("create")
       .setStyle("SECONDARY")
     )
     await guild.channels.cache.get(Channel.id).send({embeds: [Embed], components: [Buttons]})

     interaction.reply({content: `You Ticket Has Been Setup In <#${Channel.id}>`, ephemeral: true})


    } catch (err){
 console.log(err)
    }
    
    }
}