const { MessageEmbed, CommandInteraction, Client, Guild } = require('discord.js');
const db = require('quick.db');
const client = require('../../Structures/bot');;

module.exports = {
    name: 'guild-config',
    description: 'Tests pushing values to the database',
    options: [{
        name: 'server-id',
        description: 'The server id is pushed to the database (run this first)',
        type: 'SUB_COMMAND'
    }, {
        name: 'welcome',
        description: 'Set the welcome channel in the database',
        type: 'SUB_COMMAND',
        options: [{
            name: 'welcome-channel',
            description: 'Choose a channel',
            type: 'CHANNEL',
            required: true,
        }, {
            name: 'welcome-message',
            description: 'Set a welcome message',
            type: 'STRING',
            required: false,
        }]
    }, {
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
        const sub = interaction.options.getSubcommand('server-id', 'welcome', 'logs');
        const guildConfig = new db.table(`guildConfig_${interaction.guildId}`)

        switch (sub) {
            case 'server-id':
                let aometryGuildId = interaction.guildId
                guildConfig.set('guildId', aometryGuildId)
                console.log(guildConfig.get('guildId'))
                let guildDescription = guildConfig.get('guildId')
                let guildEmbed = new MessageEmbed()
                    .setDescription(`Logs channel set to: <#${guildDescription}>`)
                interaction.reply({ embeds: [guildEmbed] })
                break;

            case 'welcome':
                let welcomeChannel = interaction.options.getChannel('welcome-channel')
                let welcomeMessage = interaction.options.getString('welcome-message') || "`Welcome ${member} to **${guild.name}**!\nLatest Member Count: **${guild.memberCount}**`"
                await guildConfig.set('welcomeChannel', welcomeChannel.id)
                await guildConfig.set('welcomeMessage', welcomeMessage)
                console.log(`--New Guild Config for ${interaction.guild} :: ${guildConfig.get('guildId')}--`)
                console.log(`WelcomeChannel ID: ${guildConfig.get('welcomeChannel')}`)
                console.log(`Welcome Message: ${guildConfig.get('welcomeMessage')}`)
                let welcomeDescription = guildConfig.get('welcomeChannel')
                let welcomeEmbed = new MessageEmbed()
                    .setDescription(`Welcome channel set to: <#${welcomeDescription}>`)
                interaction.reply({ embeds: [welcomeEmbed] })
                break;

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

        client.on("guildMemberRoleAdd", (member, role) => {

    const LogChannel = interaction.options.getChannel('logs-channel'); // Replace with your channel id
    const MemberRoleAdd = new MessageEmbed()
        .setTitle('Пользователь получил роль!')
        .setColor('#2F3136')
        .setDescription(`**${member.user}** получил роль ${role}`)
        .setTimestamp()
        .setFooter({text: `${member.user.id}`})

    return LogChannel.send({
        embeds: [MemberRoleAdd]
    });

})

// Member Lost Role
client.on("guildMemberRoleRemove", (member, role) => {

    const LogChannel = interaction.options.getChannel('logs-channel'); // Replace with your channel id
    const MemberRoleRemove = new MessageEmbed()
        .setTitle('Пользователь потерял роль!')
        .setColor('#2F3136')
        .setDescription(`**${member.user}** потерял роль ${role} `)
        .setTimestamp()
        .setFooter({text: `${member.id}`})

    return LogChannel.send({
        embeds: [MemberRoleRemove]
    });

})

// Nickname Changed
client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {

    const LogChannel = interaction.options.getChannel('logs-channel'); // Replace with your channel id
    const MemberNicknameUpdate = new MessageEmbed()
        .setTitle('Никнейм обновлен')
        .setColor('#2F3136')
        .setDescription(`${member.user.tag} сменил ник с \`${oldNickname}\` на \`${newNickname}\``)
        .setTimestamp()
        .setFooter({text: `${user.id}`})
        

    return LogChannel.send({
        embeds: [MemberNicknameUpdate]
    });

});


// MesageDelete

client.on("messageContentDelete", (message, oldContent, newContent) => {
    if(message.author.bot) return;
        
        const LogChannel = interaction.options.getChannel('logs-channel'); // Replace with your channel id
    const Log = new MessageEmbed()
        .setColor('#36393f')
        .setDescription(`**Сообщение удалено**`)
        .setFooter({text: `${message.author.id}`})
        .setTimestamp()
        .addFields(
        {
            name: `Пользователь`,
            value: `${message.author}`
        },
        {
            name: `Канал`,
            vale: `${message.channel}`
        },
        {
            name: 'Содержимое',
            value: `${message.content ? message.content : "None"}`.slice(0, 4096)
        },
         )

        if(message.attachments.size >= 1) {
            Log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        }

        return LogChannel.send({
            embeds: [Log]
        });
})

// Message Update

client.on("messageContentEdited", (message, oldContent, newContent) => {
    if(message.author.bot) return;
    const LogChannel = interaction.options.getChannel('logs-channel'); // Replace with your channel id
    const MessageEdited = new MessageEmbed()
        .setTitle('Сообщение изменено')
        .setColor('#2F3136')
        .setTimestamp()
        .setFooter({text: `${message.author.id}`})
        .addFields(
        {
            name: "Отправитель",
            value: `${message.author}`
        },
        {
            name: "Канал",
            value: `${message.channel}`

        },
        {
            name: `До изменения`,
            value: `${oldContent}`,
        },
        {
            name: 'После изменения',
            value: `${newContent}`.slice(0, 4096),
        },
        )
        

    return LogChannel.send({
        embeds: [MessageEdited]
    });

})


// Username Updated
client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {

    const LogChannel = interaction.options.getChannel('logs-channel'); // Replace with your channel id
    const Username = new MessageEmbed()
        .setTitle('Никнейм обновлен')
        .setColor('#2F3136')
        .setDescription(`${user.tag} обновил свой никнейм с ${oldUsername} на ${newUsername}`)
        .setFooter({text: `${user.id}`})

    return LogChannel.send({
        embeds: [Username]
    });
})





    }
}