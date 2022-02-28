const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const suggestDB = require("../../Memory/Schems/SuggestDB");
const suggestSetupDB = require("../../Memory/Schems/suggestSetupDB");

module.exports = {
  name: "suggest",
  description: "Создание предложения.",
  usage: "/suggest",
  options: [
    {
      name: "тип",
      description: "Тип предложения",
      required: true,
      type: "STRING",
    },
    {
      name: "предложение",
      description: "Опишите свое предложение.",
      type: "STRING",
      required: true,
    },
    {
      name: "оповещение",
      description: "Будет ли бот отправлять вам сообщения, как только ваше предложение будет отклонено или принято.",
      type: "BOOLEAN",
      required: true,
    }
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { options, guildId, member, user } = interaction;

    const suggestionsSetup = await suggestSetupDB.findOne({ GuildID: guildId });
    var suggestionsChannel;

    if(!suggestionsSetup) {
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Этот сервер не настроил систему предложений.`)]})
    } else {
      suggestionsChannel = interaction.guild.channels.cache.get(suggestionsSetup.ChannelID)
    }

    if(suggestionsSetup.Disabled)
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Предложения в настоящее время отключены.`)]})

    if(suggestionsSetup.ChannelID === "None")
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Канал предложения не был настроен.`)]})

    const type = options.getString("тип");
    const suggestion = options.getString("предложение");
    const DM = options.getBoolean("оповещение")
    
    const Embed = new MessageEmbed()
      .setColor("ORANGE")
      .setAuthor({name: `${user.tag}`, iconURL: `${user.displayAvatarURL({dynamic: true})}`}, )
      .setDescription(`**Предложение:**\n${suggestion}`)
      .addFields(
        {name: "Тип", value: type, inline: true},
        {name: "Статус", value: "🕐 Ожидание", inline: true},
        {name: "Причина", value: "Ожидание", inline: false},
      )
      .addFields(
        
        {name: "За", value: "0", inline: true},
        {name: "Против", value: "0", inline: true},
        {name: "Голоса", value: "0", inline: true},
      )
    
    const buttons = new MessageActionRow()
    buttons.addComponents(
      new MessageButton().setCustomId("suggestion-upvote").setLabel(`За`).setStyle("PRIMARY").setEmoji(`✅`),
      new MessageButton().setCustomId("suggestion-downvote").setLabel(`Против`).setStyle("DANGER").setEmoji(`❌`)
    )

    try {
      const M = await suggestionsChannel.send({embeds: [Embed], components: [buttons]});

      await suggestDB.create({GuildID: guildId, MessageID: M.id, Details: [
        {
          MemberID: member.id,
          Type: type,
          Suggestion: suggestion,
        }],
        MemberID: member.id,
        DM: DM,
        UpvotesMembers: [],
        DownvotesMembers: [],
        InUse: false,
      })
      interaction.reply({embeds: [new MessageEmbed().setColor("ORANGE").setDescription(`✅ Ваше предложение (${M.url}) было успешно создано и отправлен в ${suggestionsChannel}`)]})
    } catch (err) {
      console.log(err);
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Произошла ошибка.`)]})     
    }
  }
}