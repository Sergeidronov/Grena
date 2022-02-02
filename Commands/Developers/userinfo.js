const { Client, MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "Отображает информацию о цели.",
  options: [
    {
      name: "target",
      description: "Выберите цель.",
      type: "USER",
      required: true,
    },
  ],
  /**
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */
  async execute(interaction, client) {
    const Target = interaction.options.getMember('target')

    var main = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel(`Основная информация`)
        .setEmoji(`ℹ`)
        .setCustomId(`main`)
        .setDisabled(true)
        .setStyle(`SECONDARY`),
      new MessageButton()
        .setLabel(`Информация о ролях`)
        .setStyle(`DANGER`)
        .setEmoji(`ℹ`)
        .setCustomId(`roles`),
      new MessageButton()
        .setLabel(`Разрешения`)
        .setStyle(`SECONDARY`)
        .setEmoji(`ℹ`)
        .setCustomId(`permissions`)

    );

    const Response = new MessageEmbed()
      .setAuthor({ name: `${Target.user.tag}`, iconURL: `${Target.user.displayAvatarURL({ dynamic: true })}` })
      .setThumbnail(`${Target.displayAvatarURL({ dynamic: true })}`)
      .setColor("WHITE")
      .addField("Айди", `${Target.id}`, false)
      .addField("Участник сервера с", `<t:${parseInt(Target.joinedTimestamp / 1000)}:R>`, false)
      .addField("Аккаунт создан", `<t:${parseInt(Target.user.createdTimestamp / 1000)}:R>`, false)
      .addField(`Никнейм `, `**${Target.nickname || `Default`}**`, true)
  const Sm = await interaction.reply({ embeds: [Response], components: [main], fetchReply:true });

    const collector = Sm.createMessageComponentCollector();

    collector.on('collect', async i => {
      if (i.user.id === interaction.user.id) {
        if (i.customId === 'main') {
          await i.update({ embeds: [Response], components: [main] })
        }
        if (i.customId === 'roles') {
          var role = new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel(`Основная информация`)
              .setEmoji(`ℹ`)
              .setCustomId(`main`)
              .setStyle(`SECONDARY`),
            new MessageButton()
              .setLabel(`Информация о ролях`)
              .setStyle(`DANGER`)
              .setDisabled(true)
              .setEmoji(`ℹ`)
              .setCustomId(`roles`),
            new MessageButton()
              .setLabel(`Разрешения`)
              .setStyle(`SECONDARY`)
              .setEmoji(`ℹ`)
              .setCustomId(`permissions`)

          );
          const rolee = new MessageEmbed()
            .setAuthor({ name: `${Target.user.tag}`, iconURL: `${Target.user.displayAvatarURL({ dynamic: true })}` })
            .addField(`Роли : `, `${Target.roles.cache.map(r => r).sort((first, second) => second.position - first.position).join(` | `)}`, true)
            .addField(`Высшая роль : `, `${Target.roles.highest}`, false)
            .setColor(`RANDOM`)
            .setThumbnail(`${Target.displayAvatarURL({ size: 1024, dynamic: true })}`)
          await i.update({ embeds: [rolee], components: [role] })
        }
        if (i.customId === `permissions`) {
          var perms = new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel(`Основная информация`)
              .setEmoji(`ℹ`)
              .setCustomId(`main`)
              .setStyle(`SECONDARY`),
            new MessageButton()
              .setLabel(`Информация о ролях`)
              .setStyle(`DANGER`)
              .setEmoji(`ℹ`)
              .setCustomId(`roles`),
            new MessageButton()
              .setLabel(`Разрешения`)
              .setStyle(`SECONDARY`)
              .setDisabled(true)
              .setEmoji(`ℹ`)
              .setCustomId(`permissions`)

          );
          var eee2 = new MessageEmbed()
            .setAuthor({ name: `${Target.user.tag}`, iconURL: `${Target.user.displayAvatarURL({ dynamic: true })}` })
            .addField(`Разрешения : `, `\`\`\`${Target.permissions.toArray().join(` | `)}\`\`\``, true)
            .setColor(`RANDOM`)
            .setThumbnail(`${Target.displayAvatarURL({ size: 1024, dynamic: true })}`)
          await i.update({ embeds: [eee2], components: [perms] })
        }
      } else {
        i.reply({ content: `Эта кнопка не для тебя!`, ephemeral: true });
      }
    })
  }
}