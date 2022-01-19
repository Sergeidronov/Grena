const { CommandInteraction, MessageEmbed, Message } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Create a help",
    usage: "/help",
    options: [
      {
          name: "help",
          description: "Describe the help you want to make.",
          type: "STRING",
          required: true
      }, 
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        
        const { options } = interaction;

        const help = options.getString("hel p");
        const gChannel = options.getChannel("channel") || interaction.channel;

        const helpEmbed = new Discord.MessageEmbed()
            .setColor("AQUA")
            .setTitle("Тест")
            .setDescription(help)
            .setTimestamp()
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)

        const sendMessage = await client.channels.cache.get(gChannel.id).send({embeds: [helpEmbed]});

        interaction.reply({embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`The help was successfully ✅`)],ephemeral: true})
    }
}