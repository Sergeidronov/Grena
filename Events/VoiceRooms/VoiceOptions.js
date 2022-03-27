const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  /**
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    const { guild, customId, channel, member } = interaction;

    if(!["hide", "unhide", "public", "private", "increase", "decrease"].includes(customId)) return;

    const voiceChannel = member.voice.channel;
    const ownedChannel = client.voiceGenerator.get(member.id);

    const errorEmbed = new MessageEmbed()
    .setColor("RED")
    .setAuthor({name: `Voice Room | ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true, size: 512})}`})
    //.setFooter({text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})

    const successEmbed = new MessageEmbed()
    .setColor("GREEN")
    .setAuthor({name: `Voice Room | ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true, size: 512})}`})
    //.setFooter({text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})

    if(!voiceChannel)
      return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772> Вы не подключены к голосовому каналу.")], ephemeral: true})

    if(!ownedChannel || voiceChannel.id !== ownedChannel)
      return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772> Вы не являетесь владельцем этой голосовой комнаты.")], ephemeral: true});

    switch(customId) {
      case "hide" :
        voiceChannel.permissionOverwrites.edit(guild.id, {VIEW_CHANNEL: false});
        interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Ваша голосовая комната теперь ** скрыта ** от всех.`)], ephemeral: true})
        break;
      case "unhide" :
        voiceChannel.permissionOverwrites.edit(guild.id, {VIEW_CHANNEL: true});
        interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Ваша голосовая комната теперь ** видна ** всем.`)], ephemeral: true})
        break;
      case "public" :
        voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: null});
        interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Ваша голосовая комната была настроена на ** Общедоступную **.`)], ephemeral: true})
        break;
      case "private" :
        voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: false});
        interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Ваша голосовая комната была настроена на ** Приватную **.`)], ephemeral: true})
        break;
      case "increase" :
        if(voiceChannel.userLimit > 98) return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772> Вы не можете увеличивать лимит пользователя дальше.")], ephemeral: true});
        voiceChannel.edit({ userLimit: voiceChannel.userLimit + 1});
        interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Ваш лимит пользователей голосовой комнаты был увеличен.`)], ephemeral: true})
        break;
      case "decrease" :
        if(voiceChannel.userLimit < 1) return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772>Вы не можете больше уменьшать лимит пользователя.")], ephemeral: true});
        voiceChannel.edit({ userLimit: voiceChannel.userLimit - 1});
        interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Ваш лимит пользователей голосовой комнаты был уменьшен.`)], ephemeral: true})
    }
  }
}