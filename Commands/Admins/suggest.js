const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const suggestDB = require("../../Memory/Schems/SuggestDB");
const suggestSetupDB = require("../../Memory/Schems/suggestSetupDB");

module.exports = {
  name: "suggest",
  description: "Create a suggestion.",
  usage: "/suggest",
  options: [
    {
      name: "type",
      description: "Select a type.",
      required: true,
      type: "STRING",
      choices: [
        {
          name: "Command",
          value: "Command",
        },
        {
          name: "Event",
          value: "Event",
        },
        {
          name: "System",
          value: "System",
        },
        {
          name: "Other",
          value: "Other",
        },
      ],
    },
    {
      name: "suggestion",
      description: "Describe your suggestion.",
      type: "STRING",
      required: true,
    },
    {
      name: "dm",
      description: "Set whether the bot will DM you, once your suggestion has been declined or accepted.",
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

    const type = options.getString("type");
    const suggestion = options.getString("suggestion");
    const DM = options.getBoolean("dm")
    
    const Embed = new MessageEmbed()
      .setColor("ORANGE")
      .setAuthor({name: `${user.tag}`, iconURL: `${user.displayAvatarURL({dynamic: true})}`}, )
      .setDescription(`**Предложение:**\n${suggestion}`)
      .addFields(
        {name: "Type", value: type, inline: true},
        {name: "Status", value: "🕐 Ожидание", inline: true},
        {name: "Reason", value: "Ожидание", inline: true},
      )
      .addFields(
        {name: "Upvotes", value: "0", inline: true},
        {name: "Downvotes", value: "0", inline: true},
        {name: "Overall votes", value: "0", inline: true},
      )
    
    const buttons = new MessageActionRow()
    buttons.addComponents(
      new MessageButton().setCustomId("suggestion-upvote").setLabel(`Голос за`).setStyle("PRIMARY").setEmoji(`✅`),
      new MessageButton().setCustomId("suggestion-downvote").setLabel(`Голос против`).setStyle("DANGER").setEmoji(`❌`)
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
      interaction.reply({embeds: [new MessageEmbed().setColor("ORANGE").setDescription(`✅ Ваше [suggestion](${M.url}) был успешно создано и отправлен в ${suggestionsChannel}`)]})
    } catch (err) {
      console.log(err);
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Произошла ошибка.`)]})     
    }
  }
}