const { CommandInteraction, MessageEmbed } = require(`discord.js`);

module.exports = {
    name: "vote",
    description:"Создайте предложение.",
    permission: "ADMINISTRATOR",
    options: [           
        {
            name: "functional",
            description: "Опишите функциональность этого предложения.",
            type: "STRING",
            required: true,
            },
    
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;

        const funcs = options.getString("functional");

        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`**Идею предложил** ${interaction.member} .`)
        .addField("Описание предложения", `${funcs}`, true)
        const message = await interaction.reply({embeds: [Response], fetchReply: true})
        message.react("👍")
        message.react("👎")       

    }
}