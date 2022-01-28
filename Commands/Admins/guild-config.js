const { MessageEmbed, CommandInteraction } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'guild-config',
    description: 'Tests pushing values to the database',
    permission: "ADMINISTRATOR",
    options: [
        {
        name: 'server-id',
        description: 'The server id is pushed to the database (run this first)',
        type: 'SUB_COMMAND'
    },
    {
        name: 'logs',
        description: 'Set the logs channel in the database',
        type: 'SUB_COMMAND',
        options: [{
            name: 'logs-channel',
            description: 'Choose a channel',
            type: 'CHANNEL',
            required: true,
        }]
    }],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand('logs');
        const guildConfig = new db.table(`guildConfig_${interaction.guildId}`)

        switch (sub) {
            case 'logs':
                let logsChannel = interaction.options.getChannel('logs-channel')
                await guildConfig.set('logsChannel', logsChannel.id)
                console.log(`--New Guild Config for ${interaction.guild} :: ${guildConfig.get('guildId')}--`)
                console.log(`Logs Channel: ${guildConfig.get('logsChannel')}`)
                let logsDescription = guildConfig.get('logsChannel')
                let logsEmbed = new MessageEmbed()
                    .setDescription(`Logs channel set to: <#${logsDescription}>`)
                interaction.reply({ embeds: [logsEmbed] })
                break;
        }

        const Log = new MessageEmbed()
        .setColor('#36393f')
        .setDescription(`A Message by ${message.author.tag} was deleted`)
        .addFields({
            name: 'Content',
            value: `${message.content ? message.content : "None"}`.slice(0, 4096),
            inline: false
        }, {
            name: 'Action performed',
            value: `(<t:${happen}:R>)`,
            inline: false
        })

        if(message.attachments.size >= 1) {
            Log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        }

        LogChannel.send({embeds: [Log]})

    }

    

    }