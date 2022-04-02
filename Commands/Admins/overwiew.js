const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
    name: "guild-overview",
    description: "Guild overview",
    options: [
        {
            name: "member",
            description: "Channel for membercount",
            type: "CHANNEL",
            required: true
        },
        {
            name: "channel",
            description: "Channel for channelcount",
            type: "CHANNEL",
            required: true
        },
        {
            name: "emoji",
            description: "Channel for emoji count",
            type: "CHANNEL",
            required: true
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(client, interaction)  {
        const { guild, options } = interaction;
        const { members, memberCount, channels, stickers, emojis, voiceChannels } = guild;

        const memberChannel    = options.getChannel("member");
        const channelChannel   = options.getChannel("channel");
        const emojiChannel     = options.getChannel("emoji");

        const memberChannelCount = interaction.guild.channels.cache.get(memberChannel.id);
        const channelChannelCount = interaction.guild.channels.cache.get(channelChannel.id);
        const emojiChannelCount = interaction.guild.channels.cache.get(emojiChannel.id);

        const successEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Guild overview")
        .setDescription("Guild overview has started! These statistics will be updated every 10 minutes!")

        interaction.reply({ embeds: [successEmbed] });

        setInterval(() => {
            const channelMembers = `😀 Members: ${memberCount}`;
            const channelChannels = `📢 Channels: ${channels.cache.size}`;
            const channelEmojis = `🎨 Emojis: ${emojis.cache.size}`;

            memberChannelCount.setName(channelMembers);
            channelChannelCount.setName(channelChannels);
            emojiChannelCount.setName(channelEmojis);
        }, 60000);
    }
}