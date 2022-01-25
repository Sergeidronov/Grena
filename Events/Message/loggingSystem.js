// ok now over here i already made a code and it is 500+ lines so... i will paste the code which i made here
const client = require('../../Structures/index');
const {
    MessageEmbed
} = require('discord.js');










// Member Got Role
client.on("guildMemberRoleAdd", (member, role) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const MemberRoleAdd = new MessageEmbed()
        .setTitle('User Got Role!')
        .setColor('#2F3136')
        .setDescription(`**${member.user.tag}** got the role \`${role.name}\``);

    return LogChannel.send({
        embeds: [MemberRoleAdd]
    });

})

// Member Lost Role
client.on("guildMemberRoleRemove", (member, role) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const MemberRoleRemove = new MessageEmbed()
        .setTitle('User Lost Role!')
        .setColor('#2F3136')
        .setDescription(`**${member.user.tag}** lost the role \`${role.name}\``);

    return LogChannel.send({
        embeds: [MemberRoleRemove]
    });

})

// Nickname Changed
client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const MemberNicknameUpdate = new MessageEmbed()
        .setTitle('Nickname Updated')
        .setColor('#2F3136')
        .setDescription(`${member.user.tag} changed nickname from \`${oldNickname}\` to \`${newNickname}\``);

    return LogChannel.send({
        embeds: [MemberNicknameUpdate]
    });

})

// Member Joined
client.on("guildMemberEntered", (member) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const MemberJoined = new MessageEmbed()
        .setTitle('User Joined')
        .setColor('#2F3136')
        .setDescription(`${member.user.tag} Joined!`);

    return LogChannel.send({
        embeds: [MemberJoined]
    });

})

// Username Updated
client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const Username = new MessageEmbed()
        .setTitle('Username Updated')
        .setColor('#2F3136')
        .setDescription(`${user.tag} updated thier username from ${oldUsername} to ${newUsername}`);

    return LogChannel.send({
        embeds: [Username]
    });

})

// Discriminator Updated
client.on("userDiscriminatorUpdate", (user, oldDiscriminator, newDiscriminator) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const Discriminator = new MessageEmbed()
        .setTitle('Discriminator Updated')
        .setColor('#2F3136')
        .setDescription(`${user.tag} updated thier discriminator from ${oldDiscriminator} to ${oldDiscriminator}`);

    return LogChannel.send({
        embeds: [Discriminator]
    });

})




// VC Switch
client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const VCSwitch = new MessageEmbed()
        .setTitle('Voice Channel Switched')
        .setColor('#2F3136')
        .setDescription(member.user.tag + " left " + oldChannel.name + " and joined " + newChannel.name + "!");

    return LogChannel.send({
        embeds: [VCSwitch]
    });

})

// VC Mute
client.on("voiceChannelMute", (member, muteType) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const VCMute = new MessageEmbed()
        .setTitle('User Muted')
        .setColor('#2F3136')
        .setDescription(member.user.tag + " became muted! (type: " + muteType + ")");

    return LogChannel.send({
        embeds: [VCMute]
    });

})

// VC Unmute
client.on("voiceChannelUnmute", (member, oldMuteType) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const VCUnmute = new MessageEmbed()
        .setTitle('User Unmuted')
        .setColor('#2F3136')
        .setDescription(member.user.tag + " became unmuted!");

    return LogChannel.send({
        embeds: [VCUnmute]
    });

})

// VC Defean
client.on("voiceChannelDeaf", (member, deafType) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const VCDeafen = new MessageEmbed()
        .setTitle('User Deafend')
        .setColor('#2F3136')
        .setDescription(member.user.tag + " become deafed!");

    return LogChannel.send({
        embeds: [VCDeafen]
    });

})

// VC Undefean
client.on("voiceChannelUndeaf", (member, deafType) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const VCUndeafen = new MessageEmbed()
        .setTitle('User Undeafend')
        .setColor('#2F3136')
        .setDescription(member.user.tag + " become undeafed!");

    return LogChannel.send({
        embeds: [VCUndeafen]
    });

})


