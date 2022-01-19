const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ban',
  description: 'Ban A User',
  usage: 'ban <user> <reason>',
  clientPerms: ['BAN_MEMBERS',  'SEND_MESSAGES',  'EMBED_LINKS'],
  userPerms: ['BAN_MEMBERS'],
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member)
    return message.channel.send(`<:Error:911472103834927145> Please Mention A Valid User Or Provide Valid User ID!`)
    if(member === message.member)
    return message.channel.send(`<:Error:911472103834927145> Cannot Ban Yourself!`)
    if(member.roles.highest.position >= message.member.roles.highest.position)
    return message.channel.send(`<:Error:911472103834927145> You Cannot Ban Semeone With An Equal Higher Role!`)
    if(!member.bannable)
    return message.channel.send(`<:Error:911472103834927145> Provided Member Is Not Bannable!`);
    let reason = args.slice(1).join(' ');
    if(!reason) reason = '`None`';
    if(reason.lenght > 1024) reason = reason.slice(0, 1021) + '...';
    await member.ban ({ reason: reason });
    const embed = new MessageEmbed()
    .setTitle('Ban Member!')
    .setDescription(`<:Check:910671475969777694> ${member} Was Successfully Banned`)
    .addField('Reason', `${reason}`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setColor('#F871A0');
    message.channel.send({ embeds: [embed] })
  }
}