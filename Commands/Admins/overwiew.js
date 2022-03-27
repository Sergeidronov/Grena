const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "overview",
    description: "Automatically Updates Guild Overview",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: 'member',
            description: 'choose a channel for member count',
            type: 'CHANNEL',
            required: true,
        }, {
            name: 'channel',
            description: 'choose a channel for channel count',
            type: 'CHANNEL',
            required: true,
        }, {
            name: 'emoji',
            description: 'choose a channel for emoji count',
            type: 'CHANNEL',
            required: true,
        }
],
    async execute(interaction) {

        const { guild } = interaction;

        const { members, memberCount, channels, stickers, emojis, voiceChannels } = guild;

        const member = interaction.options.getChannel('member')
        const channel = interaction.options.getChannel('channel')
        const emoji = interaction.options.getChannel('emoji')

        const name = interaction.guild.channels.cache.get(member.id)
        const name1 = interaction.guild.channels.cache.get(channel.id)
        const name2 = interaction.guild.channels.cache.get(emoji.id)

        const aaa = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`A guild overview has begun and will renew every 10 minutes`)

        interaction.reply({ embeds: [aaa] })

        setInterval(() => {

                    const channelName = `👤 Members: ${memberCount}`;
                    const channelPlayer = `📊 Channels: ${channels.cache.size}`;
                    const channelIp = `😇 Emoji's: ${stickers.cache.size + emojis.cache.size}`;

                    name.setName(channelName);
                    name1.setName(channelPlayer);
                    name2.setName(channelIp);

            }, 600000)}}


//made by Ｈｘｐｅ　（望み ）#8806