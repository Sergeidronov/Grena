// ok now over here i already made a code and it is 500+ lines so... i will paste the code which i made here
const client = require('../../Structures/bot');
const {
    MessageEmbed
} = require('discord.js');










// Member Got Role
client.on("guildMemberRoleAdd", (member, role) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const MemberRoleAdd = new MessageEmbed()
        .setTitle('Пользователь Получил Роль!')
        .setColor('#2F3136')
        .setDescription(`**${member.user.tag}** получил роль \`${role.name}\``);

    return LogChannel.send({
        embeds: [MemberRoleAdd]
    });

})

// Member Lost Role
client.on("guildMemberRoleRemove", (member, role) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const MemberRoleRemove = new MessageEmbed()
        .setTitle('Пользователь потерял роль!')
        .setColor('#2F3136')
        .setDescription(`**${member.user.tag}** потерял роль \`${role.name}\``);

    return LogChannel.send({
        embeds: [MemberRoleRemove]
    });

})

// Nickname Changed
client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const MemberNicknameUpdate = new MessageEmbed()
        .setTitle('Никнейм обновлен')
        .setColor('#2F3136')
        .setDescription(`${member.user.tag} сменил ник с \`${oldNickname}\` на \`${newNickname}\``);

    return LogChannel.send({
        embeds: [MemberNicknameUpdate]
    });

})

// Member Joined
client.on("guildMemberEntered", (member) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const MemberJoined = new MessageEmbed()
        .setTitle('Пользователь присоединился')
        .setColor('#2F3136')
        .setDescription(`${member.user.tag} присоединился!`);

    return LogChannel.send({
        embeds: [MemberJoined]
    });

})

// Username Updated
client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {

    const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id
    const Username = new MessageEmbed()
        .setTitle('Никнейм обновлен')
        .setColor('#2F3136')
        .setDescription(`${user.tag} обновил свой никнейм с ${oldUsername} на ${newUsername}`);

    return LogChannel.send({
        embeds: [Username]
    });

})



