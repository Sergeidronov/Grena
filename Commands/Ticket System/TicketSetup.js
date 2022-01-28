const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js')
const DB = require('../../Memory/Schems/TicketSetupDB')

module.exports = {
  name: "ticket-setup",
  description: "setup the ticket",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "channel",
      description: "Channel To Send Ticket",
      required: true,
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
    },
    {
      name: "category",
      description: "Category To Send Ticket",
      required: true,
      type: "CHANNEL",
      channelTypes: ["GUILD_CATEGORY"],
    },
    {
      name: "transcripts",
      description: "Transcript To Send in Channel",
      required: true,
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
    },
    {
      name: "handlers",
      description: "Ticket Handlers",
      required: true,
      type: "ROLE",
    },
    {
      name: "description", 
      description: "Select the transcripts", 
      required: true,
      type: "STRING", 
  },
  {
    name: "firstbutton", 
    description: "Give your first button", 
    required: true,
    type: "STRING", 
},
  ],
   /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
      const { guild, options } = interaction;

    try {
      const Channel = options.getChannel("channel");
      const Category = options.getChannel("category");
     const Transcripts = options.getChannel("transcripts")
     const Handlers = options.getRole("handlers")
     const Description = options.getString("description");
     const Button1 = options.getString("firstbutton").split(",");

     const Emoji1 = Button1[1];

     await DB.findOneAndUpdate(
     {GuildID: guild.id}, 
     { 
     Channel: Channel.id,
     Category: Category.id,
     Transcripts: Transcripts.id, 
     Handlers: Handlers.id,
     Description: Description,
     Everyone: guild.id,
     Buttons: [Button1[0] ],
    },
     {
       new: true,
       upsert: true
     });

     const Embed = new MessageEmbed() 
                    .setAuthor({
                        name: guild.name + " | Ticketing System",
                        iconURL: guild.iconURL ({dynamic: true}),
                    })
                    .setDescription(Description)
                    .setColor("RED");

                    const Buttons = new MessageActionRow()
            
                    Buttons.addComponents(
                        new MessageButton()
                        .setCustomId(Button1[0])
                        .setLabel(Button1[0])
                        .setStyle("PRIMARY")
                        .setEmoji(Emoji1),
            
                    );

                    await guild.channels.cache.get(Channel.id)
                    .send({embeds: [Embed], components: [Buttons]});
            
                    interaction.reply({content: "Done", ephemeral: true});


    } catch (err){
 console.log(err)
    }
    
    }
}