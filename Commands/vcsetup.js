const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");

const channelID = '957584962448687134' // PUT YOUR CHANNEL ID HERE. THE EMBED WILL BE SENT TO THIS CHANNEL FOR CONTROLLING VOICE ROOMS WITH BUTTONS.

module.exports = {
  name: "vcsetup",
  description: "Настройка Голосовых Комнат.",
  permission: "ADMINISTRATOR",

  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {

    const { guild } = interaction;
    
    const Embed = new MessageEmbed()
    .setColor("BLUE")
    .setAuthor({name: "🔊 Голосовые комнаты"})
    .setDescription(`Используйте пользовательские голосовые комнаты, чтобы иметь отдельный голосовой канал только для вас и ваших друзей!
    
    ▫ ️Используйте команду \`/vc\` для настройки вашей голосовой комнаты.`)
    .setFooter({text: `Используйте кнопки ниже, чтобы управлять своей голосовой комнатой.`, iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})
    
    const Buttons = new MessageActionRow();
    Buttons.addComponents(
    new MessageButton()
      .setCustomId("hide")
      .setLabel("Скрыть комнату")
      .setStyle("DANGER")
      .setEmoji("⛔"),
    new MessageButton()
      .setCustomId("unhide")
      .setLabel("Показать комнату")
      .setStyle("PRIMARY")
      .setEmoji("👁️"),
    new MessageButton()
      .setCustomId("public")
      .setLabel("Сделать публично")
      .setStyle("SUCCESS")
      .setEmoji("🔓"),
    new MessageButton()
      .setCustomId("private")
      .setLabel("Сделать приватно")
      .setStyle("PRIMARY")
      .setEmoji("🔒"),
    );

    const Buttons2 = new MessageActionRow();
    Buttons2.addComponents(
    new MessageButton()
      .setCustomId("increase")
      .setLabel("Увеличить Лимит")
      .setStyle("SECONDARY")
      .setEmoji("➕"),
    new MessageButton()
      .setCustomId("decrease")
      .setLabel("Уменьшить лимит")
      .setStyle("SECONDARY")
      .setEmoji("➖"),
    );

    await guild.channels.cache.get(`${channelID}`).send({embeds: [Embed], components: [Buttons,Buttons2]});

    interaction.reply({ content: "Настройка голосовых комнат завершена.", epheneram: true})
  }
}