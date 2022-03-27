const { CommandInteraction, MessageEmbed } = require("discord.js");

/**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

module.exports = {
  name: "vc",
  description: "Настройте свою голосовую комнату.",
  options: [
    {
      name: "configure",
      description: "Настройте свою голосовую комнату.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "name",
          description: "Измените название своей голосовой комнаты.",
          type: "STRING",
        },
        {
          name: "limit",
          description: "Измените лимит пользователей вашей голосовой комнаты.",
          type: "NUMBER",
        },
      ]
    },
    {
      name: "add",
      description: "Внесите пользователя в белый список вашей голосовой комнаты.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "Выберите пользователя.",
          type: "USER",
          required: true
        }
      ]
    },
    {
      name: "remove",
      description: "Внесите пользователя в черный список из вашей голосовой комнаты.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "Выберите пользователя.",
          type: "USER",
          required: true
        }
      ]
    },
    {
      name: "public",
      description: "Установите свою голосовую комнату как общедоступную.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "turn",
          description: "Включить или выключить.",
          type: "STRING",
          required: true,
          choices: [
            { name: "on", value: "on" },
            { name: "off", value: "off"}
          ]
        }
      ]
    },
    {
      name: "hide",
      description: "Скрывайте или не показывайте свою голосовую комнату от всех. ((Скрыто по умолчанию)",
      type: "SUB_COMMAND",
      options: [
        {
          name: "switch",
          description: "Включите (скрыть) или выключите (не показывать).",
          type: "STRING",
          required: true,
          choices: [
            { name: "on", value: "on" },
            { name: "off", value: "off"}
          ]
        }
      ]
    },
  ],

  async execute(interaction, client) {
    const {options, member, guild} = interaction;

    const subCommand = options.getSubcommand();
    const voiceChannel = member.voice.channel;
    const ownedChannel = client.voiceGenerator.get(member.id);

    const vcName = options.getString("name")
    const vcLimit = options.getNumber("limit")
    
    const errorEmbed = new MessageEmbed()
    .setColor("RED")
    .setAuthor({name: `Голосовая комната | ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true, size: 512})}`})
    //.setFooter({text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})

    const successEmbed = new MessageEmbed()
    .setColor("GREEN")
    .setAuthor({name: `Голосовая комната | ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true, size: 512})}`})
    //.setFooter({text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})

    if(!voiceChannel)
      return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772> Вы не подключены к голосовому каналу.")], ephemeral: true})

    if(!ownedChannel || voiceChannel.id !== ownedChannel)
      return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772> Вы не являетесь владельцем этой голосовой комнаты.")], ephemeral: true});

    switch(subCommand) {
      case "configure" : {
        if(vcName) {
          const newName = options.getString("name")
          if(newName.length > 22 || newName.length < 1)
            return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772> Имя не может быть длиннее 22 символов или короче 1 символа.")], ephemeral: true})
          voiceChannel.edit({ name: newName});
          interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Вы изменили название своей голосовой комнаты на \`${newName}\``)], ephemeral: true})
        }
        if(vcLimit) {
          const newLimit = options.getNumber("limit")
          if(newLimit.length > 99 || newLimit.length < 1)
            return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772> Ограничение пользователя не может быть больше 99 или меньше 1.")], ephemeral: true})
          
          voiceChannel.edit({ userLimit: newLimit});
          interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Вы изменили ограничение пользователя в своей голосовой комнате на \`${newLimit}\``)], ephemeral: true})
        }
      }
      break;
      case "add" : {
        const targetMember = options.getMember("user");
        voiceChannel.permissionOverwrites.edit(targetMember, {CONNECT: true, VIEW_CHANNEL: true});

        const channel = interaction.guild.channels.cache.get(`957584962448687134`)

        await channel.send({content: `${targetMember}, ${member} пригласил вас в свою голосовую комнату: <#${voiceChannel.id}>`}).then((m) => {
          setTimeout(() => {
            m.delete().catch(() => {});
          }, 5 * 1000);
        })

        /*await targetMember.send({content: `${member} has invited you to <#${voiceChannel.id}>`}).then((m) => {
          setTimeout(() => {
            m.delete().catch(() => {});
          }, 10 * 1000);
        })*/
        interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> ${targetMember} был внесен в белый список.`)], ephemeral: true})
      }
      break;
      case "remove" : {
        const targetMember = options.getMember("user");
        voiceChannel.permissionOverwrites.delete(targetMember);

        if(targetMember.voice.channel && targetMember.voice.channel.id == voiceChannel.id) targetMember.voice.setChannel(null);
        interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> ${targetMember} был внесен в черный список.`)], ephemeral: true})
      }
      break;
      case "public" : {
        const turnChoice = options.getString("turn");
        switch(turnChoice) {
          case "on" : {
            voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: null});
            interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Ваша голосовая комната была настроена на ** Общедоступную **.`)], ephemeral: true})
          }
          break;
          case "off" : {
            voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: false});
            interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Ваша голосовая комната была настроена на ** Приватную **.`)], ephemeral: true})
          }
          break;
        }
      }
      break;
      case "hide" : {
        const turnChoice = options.getString("switch");
        switch(turnChoice) {
          case "on" : {
            voiceChannel.permissionOverwrites.edit(guild.id, {VIEW_CHANNEL: false});
            interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Ваша голосовая комната теперь ** скрыта ** от всех.`)], ephemeral: true})
          }
          break;
          case "off" : {
            voiceChannel.permissionOverwrites.edit(guild.id, {VIEW_CHANNEL: true});
            interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Ваша голосовая комната теперь ** видна ** всем.`)], ephemeral: true})
          }
        }
      }
    }
  }
}