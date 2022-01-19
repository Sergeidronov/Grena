const { CommandInteraction, MessageEmbed, Message } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Create a help",
    usage: "/help",

    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client, bot, message, args) {
        const help = new Discord.MessageEmbed()
            .setColor("AQUA")
            .setTitle("Тест")
            .setTimestamp()
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)

        message.channel.send(help)

        interaction.reply({embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`The help was successfully ✅`)],ephemeral: true})
    }
}