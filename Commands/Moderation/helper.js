const { CommandInteraction, MessageEmbed, Message } = require("discord.js");
const Discord = require("discord.js");
const pagination = require("discord.js-pagination")

module.exports = {
    name: "helper",
    description: "Create a help",

    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client, bot, args ,message, inter) {
        
        const { options } = interaction;

        const helper = options.getString("helper");
        const gChannel = options.getChannel("channel") || interaction.channel;

        const helperEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Prefix - `/`')
        .setAuthor(`Command List`)
        .addFields({ 
            name: `/changelog `,
            value: `Команда для просмотра измений бота`,
        },
        {
            name: `/poll`,
            value: `Команда для создания голосований`,
        },
        {
            name: `/say`,
            value: `Команда для отправки сообщений от имени бота`,
        },
        { 
            name: `/clear `,
            value: `Команда для удаления сообщений`,
        },
        { 
            name: `/timeout mute `,
            value: `Команда для выдачи мута человеку`,
        },
        { 
            name: `/timeout unmute `,
            value: `Команда для снятия мута человеку`,
        },
        {
            name: `/emitt`,
            value: `Команда для добавления логов выхода/входа пользователей`
        }
        )
        


        const sendMessage = await client.channels.cache.get(gChannel.id).send({embeds: [helperEmbed]});


        interaction.reply({embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`The help was successfully`)],ephemeral: true})
    }
}