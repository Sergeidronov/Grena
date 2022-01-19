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
        .setColor('#0099ff')
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .addField('Inline field title', 'Some value here', true)
        .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        const sendMessage = await client.channels.cache.get(gChannel.id).send({embeds: [helperEmbed]});


        interaction.reply({embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`The help was successfully`)],ephemeral: true})
    }
}