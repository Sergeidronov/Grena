const {
    MessageEmbed,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
} =require("discord.js");
const DB = require("../../Memory/Schems/TicketSetup");

module.exports = {
    name: "ticketsetup",
    description: "Setup ticket",
    permission: "ADMINISTRATOR",
    options: [
        {
        name: "channel", 
        description: "Select the ticket creation channel", 
        required: true,
        type: "CHANNEL", 
        channelTypes: ["GUILD_TEXT"],
    },
    {
        name: "category", 
        description: "Select the ticket channels creation category", 
        required: true,
        type: "CHANNEL", 
        channelTypes: ["GUILD_CATEGORY"],
    },
    {
        name: "transcripts", 
        description: "Select the transcripts", 
        required: true,
        type: "CHANNEL", 
        channelTypes: ["GUILD_TEXT"],
    },
    {
        name: "handlers", 
        description: "Select the ticket handlers role", 
        required: true,
        type: "ROLE", 
    },
    {
        name: "everyone", 
        description: "Provide the @everyone role", 
        required: true,
        type: "ROLE", 
    },
    {
        name: "description", 
        description: "Set the description", 
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
    async execute(interaction ) {
        const {guild, options} = interaction;


        try {
            const Channel = options.getChannel("channel");
            const Category = options.getChannel("category");
            const Transcripts = options.getChannel("transcripts");
            const Handlers = options.getRole("handlers");
            const Everyone = options.getRole("everyone");

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
                       Everyone: Everyone.id,
                       Description: Description,
                       Buttons: [Button1[0], ],
                    },
                    {
                        new: true,
                        upsert: true,
                    });
                    
            
                    const Button = new MessageActionRow()
            
                    Button.addComponents(
                        new MessageButton()
                        .setCustomId(Button1[0])
                        .setLabel(Button1[0])
                        .setStyle("PRIMARY")
                        .setEmoji(Emoji1),
            
                    );


                    const Embed = new MessageEmbed() 
                    .setAuthor({
                        name: guild.name + " | Тикет система",
                        iconURL: guild.iconURL ({dynamic: true}),
                    })
                    .setDescription(Description)
                    .setColor("RED");
                    

                    await guild.channels.cache.get(Channel.id)
                    .send({embeds: [Embed], components: [Button]});
            
                    interaction.reply({content: "Done", ephemeral: true});
 

        } catch (err) {
            const errEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ | 1.Убедитесь, что ни одно из названий вашей кнопки не дублируется
            2.Убедитесь, что вы можете использовать этот формат для своей кнопки => Имя, эмодзи
            3.Убедитесь, что имя вашей кнопки не превышает 200 символов
            4.Убедитесь, что эмодзи вашей кнопки на самом деле являются эмодзи`
            );
            console.log(err);
            interaction.reply({embeds: [errEmbed]});
        }

       
    },
};

