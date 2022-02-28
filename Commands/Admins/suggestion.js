const { MessageEmbed, Message, CommandInteraction, Client, Permissions } = require("discord.js");
const suggestSetupDB = require("../../Memory/Schems/suggestSetupDB");
const suggestDB = require("../../Memory/Schems/SuggestDB");

module.exports = {
  name: "suggestion",
  description: "Примите или отклоните предложение.",
  usage: "/suggestion",
  options: [
    {
      name: "accept",
      description: "Примите предложение.",
      type: "SUB_COMMAND",
      options: [
        {name: "message-id", description: "Идентификатор сообщения предложения, которое вы хотите принять.", type: "STRING", required: true},
        {name: "reason", description: "Причина, по которой это предложение было принято.", type: "STRING", required: true}
      ]
    },
    {
      name: "decline",
      description: "Отклоните предложение.",
      type: "SUB_COMMAND",
      options: [
        {name: "message-id", description: "Идентификатор сообщения предложения, которое вы хотите отклонить.", type: "STRING", required: true},
        {name: "reason", description: "Причина, по которой это предложение было отклонено.", type: "STRING", required: true}
      ]
    },
    {
      name: "delete",
      description: "Удалить предложение.",
      type: "SUB_COMMAND",
      options: [
        {name: "message-id", description: "Идентификатор сообщения предложения, которое вы хотите отклонить.", type: "STRING", required: true},
      ]
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const messageId = interaction.options.getString("message-id");
    const reason = interaction.options.getString("reason");

    if(reason) {
      if(reason.length > 1024)
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Ваша причина не может быть длиннее 1024 символов.`)], ephemeral: true})
    }
    
    const suggestSetup = await suggestSetupDB.findOne({ GuildID: interaction.guildId });
    var suggestionsChannel;

    if(!suggestSetup) {
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Этот сервер не настроил систему предложений.`)]})
    } else {
      suggestionsChannel = interaction.guild.channels.cache.get(suggestSetup.ChannelID)
    }
    
    if(interaction.options.getSubcommand() != "delete") {
      if(suggestSetup.SuggestionManagers.length <= 0 || !suggestSetup.SuggestionManagers) {
        if(!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
          return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Вы не являетесь менеджером по предложениям.`)], ephemeral: true});
      } else {
        for (var i = 0; i < suggestSetup.SuggestionManagers.length; i++) {
          if (!interaction.member.roles.cache.has(suggestSetup.SuggestionManagers[i])) 
            continue;
           
          if (interaction.member.roles.cache.has(suggestSetup.SuggestionManagers[i])) 
            var suggestionManager = true;
      }
      if(!suggestionManager)
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Вы не являетесь менеджером по предложениям`)], ephemeral: true});
      }
    }

    
    const suggestion = await suggestDB.findOne({GuildID: interaction.guild.id, MessageID: messageId});

    if(!suggestion)
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Это предложение не было найдено в базе данных.`)], ephemeral: true})

    const message = await suggestionsChannel.messages.fetch(messageId)

    if(!message)
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Это сообщение не было найдено.`)], ephemeral: true})

    const Embed = message.embeds[0];
    if(!Embed) return;
    
    switch(interaction.options.getSubcommand()) {
      case "accept":
        Embed.fields[1] = {name: "Статус", value: "Accepted", inline: true};
        Embed.fields[2] = {name: "Причина", value: `${reason}`, inline: false}
        message.edit({embeds: [Embed.setColor("GREEN")], content: `<@${suggestion.MemberID}>`, components: []});

        if(suggestion.DM) {
          const member = client.users.cache.get(suggestion.MemberID);
          member.send({embeds: [new MessageEmbed().setColor("GREEN").setTitle("Предложение 💡").setDescription(`✅ Ваше предложение было принято.`).addFields({name: "Предложение", value: `[link](${message.url})`, inline: true}, {name: "Сервер", value: `${interaction.guild.name}`, inline: true}, {name: "Причина", value: `${reason}`, inline: true})]}).catch(() => null)
        }
        return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ [Suggestion](${message.url}) было принято.`)], ephemeral: true})
      break;

      case "decline":
        Embed.fields[1] = {name: "Статус", value: "Declined", inline: true};
        Embed.fields[2] = {name: "Причина", value: `${reason}`, inline: false}
        message.edit({embeds: [Embed.setColor("RED")], content: `<@${suggestion.MemberID}>`, components: []});

        if(suggestion.DM) {
          const member = client.users.cache.get(suggestion.MemberID);
          member.send({embeds: [new MessageEmbed().setColor("RED").setTitle("Предложение 💡").setDescription(`❌ Ваше предложение было отклонено.`).addFields({name: "Предложение", value: `[link](${message.url})`, inline: true}, {name: "Сервер", value: `${interaction.guild.name}`, inline: true}, {name: "Причина", value: `${reason}`, inline: true})]}).catch(() => null)
        }
        return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ предлложение отклонено.`)], ephemeral: true})
      break;
      
      case "delete":
        if(!suggestSetup.AllowOwnSuggestionDelete && !suggestionManager) {
          return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Вы не можете удалить это предложение`)]})
        } else if (suggestionManager) {
          await message.delete()
          return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ Это предложение было удалено.`)]})
        } else if(suggestSetup.AllowOwnSuggestionDelete) {
          if(suggestion.MemberID === interaction.member.id) {
            await message.delete()
            return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ Ваше предложение было удалено.`)]})  
          } else {
            return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Это не ваше предложение.`)]})  
          }
          
        }
      break;
    }
  },
};