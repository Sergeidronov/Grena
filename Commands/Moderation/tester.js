const { CommandInteraction, MessageEmbed, Message } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "helper",
    description: "Create a help",

    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client, bot, args ,message) {
        
        const { options } = interaction;

        const helper = options.getString("helper");
        const gChannel = options.getChannel("channel") || interaction.channel;

        const helperEmbed = new Discord.MessageEmbed()
            .setColor("AQUA")
            .setTitle("Тест")
            .setTimestamp()

        const sendMessage = await client.channels.cache.get(gChannel.id).send({embeds: [helperEmbed]});

        interaction.reply({embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`The help was successfully`)],ephemeral: true})
    }
}