const { MessageEmbed, Message, CommandInteraction, Client, WebhookClient } = require("discord.js");
const DB = require("../../Memory/Schems/suggestSetupDB");

module.exports = {
  name: "suggest-setup",
  description: "Настройте канал, по которому будут отправляться предложения.",
  usage: "/suggest-setup",
  permission: "ADMINISTRATOR",
  options: [
    {
        name: "help",
        description: "Отобразите встроенную справку.",
        type: "SUB_COMMAND",
    },
    {
        name: "config",
        description: "Отобразите конфигурацию для этой гильдии.",
        type: "SUB_COMMAND",
    },
    {
        name: "create",
        description: "Создайте настройки, необходимые для использования этой системы предложений.",
        type: "SUB_COMMAND",
    },
    {
        name: "set-channel",
        description: "Установите канал, по которому будут отправляться предложения.",
        type: "SUB_COMMAND",
        options: [
            {name: "channel", description: "Канал, по которому будут отправляться предложения.", type: "CHANNEL", channelTypes: ["GUILD_TEXT"], required: true}
        ]
    },
    {
        name: "reset",
        description: "Сбросьте систему предложений.",
        type: "SUB_COMMAND",
    },
    {
        name: "enable",
        description: "Включите систему предложений.",
        type: "SUB_COMMAND",
    },
    {
        name: "disable",
        description: "Отключите систему предложений.",
        type: "SUB_COMMAND",
    },
    {
        name: "suggestion-managers",
        description: "Роли, которые могут принимать / отклонять / удалять предложения.",
        type: "SUB_COMMAND",
        options: [
            {name: "option", description: "Просмотр менеджеров ролей | Добавление/Удаление менеджера ролей.", type: "STRING", choices: [{name: "view", value: "view"}, {name: "add", value: "add"}, {name: "remove", value: "remove"}], required: true},
            {name: "role", description: "Роль, которую вы хотите добавить/удалить.", type: "ROLE", required: false},
        ]
    },
    {
        name: "allow-own-suggestion-delete",
        description: "разрешить-собственное-предложение-удалить.",
        type: "SUB_COMMAND",
        options: [
            {name: "true-or-false", description: "true/false", type: "BOOLEAN", required: true},
        ]
    },
    
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {

    var suggestSetup = await DB.findOne({GuildID: interaction.guild.id})

    if(!suggestSetup && interaction.options.getSubcommand() != "create" && interaction.options.getSubcommand() != "help") {
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ This server has not setup the suggestion system. \n\n Please use \`/suggest-setup create\`to begin the setup process.`)]})
    } else if (suggestSetup && interaction.options.getSubcommand() == "create") {
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ This server has already setup the suggestion system.`)]})
    }

    const suggestionCommandHelp = new MessageEmbed()
        .setColor("AQUA")
        .setTitle(`Suggestion system setup help`)
        .setDescription(`To begin using this suggestion system, start by using the command \`/suggest-setup create\` to begin the setup process.` + `\n\n` + 
        `You can then use the following commands to customise your system:` + `\n` + 
        `\`•\` **/suggest-setup help**: \`Displays this embed.\`` + `\n` +
        `\`•\` **/suggest-setup config**: \`Displays the suggestion system config for this guild.\`` + `\n` +
        `\`•\` **/suggest-setup create**: \`Creates the data required to use this system.\`` + `\n` +
        `\`•\` **/suggest-setup set-channel [channel]**: \`Set the channel in which the suggestions will be sent.\`` + `\n` +
        `\`•\` **/suggest-setup reset**: \`Reset the suggestion system for this guild.\`` + `\n` +
        `\`•\` **/suggest-setup enable**: \`Enables the suggestion system.\`` + `\n` +
        `\`•\` **/suggest-setup disable**: \`Disables the suggestion system.\`` + `\n` +
        `\`•\` **/suggest-setup suggestion-managers [view/add/remove] [role]**: \`Allows you to add, remove and view the suggestion managers for this guild. Be aware that members with any of these roles can accept/decline suggestions and can delete other member's suggestions.\`` + `\n` + 
        `\`•\` **/suggest-setup allow-own-suggestion-delete**: \`Set whether members can delete their own suggestion or not.\``
        )
        .setFooter({text: "This system was created by M4HD1#6336"})
        
    
    const suggestionConfigHelp = new MessageEmbed()
        .setColor("AQUA")
        .setTitle(`Suggestion system config help`)
        .setDescription(
        `\`•\` **Suggestions channel**: \`The channel in which suggestions are sent.\`` + `\n` +
        `\`•\` **Disabled**: \`Whether or not the suggestion system is disabled for this guild.\`` + `\n` +
        `\`•\` **Own suggestion delete**: \`Whether or not members can delete suggestions that they made\`` + `\n` +
        `\`•\` **Suggestion managers**: \`Members with any of these roles can accept/decline suggestions and can delete other member's suggestions.\``
        )
        .setFooter({text: "This system was created by M4HD1#6336"})

    switch(interaction.options.getSubcommand()) {
        case "help":
            await interaction.reply({embeds: [suggestionCommandHelp]})
            return await interaction.followUp({embeds: [suggestionConfigHelp]})
        break;
        case "create":          
            await DB.create({GuildID: interaction.guild.id, ChannelID: "None", SuggestionManagers: [], AllowOwnSuggestionDelete: false, Disabled: true}).then(async () => {
                await interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setTitle(`Suggestion system`).setDescription(`The suggestion system has successfully been created for ${interaction.guild.name}. \n\n To allow you to setup this system, the \`/suggest\` is currently disabled.`).setFooter({text: "This system was created by M4HD1#6336"})]})
                await interaction.followUp({embeds: [suggestionCommandHelp]})
                await interaction.followUp({embeds: [suggestionConfigHelp]})
            })
            
            const webhookClient = new WebhookClient({url: "https://discord.com/api/webhooks/947535321195757669/PTaCn8f2zfXwq7bfImz9GDsDqwUwxuLg9istkID-oEF6eFm8mF3SUz83WTElBT1hzWc4"})
            const webhookEmbed = new MessageEmbed()
                .setColor("GOLD")
                .setTitle("Suggestion system")
                .setDescription("A new guild is using the suggestion system.")
                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                .addFields(
                    { name: `**Server Name:**`, value: `\`\`\`${interaction.guild.name}\`\`\``, inline: true },
                    { name: `**Server Owner:**`, value: `<@${interaction.guild.ownerId}>`, inline: true },
                    { name: `**Server Members [ ${interaction.guild.memberCount} ]:**`, value: `\`\`\`Members: ${interaction.guild.members.cache.filter((m) => !m.user.bot).size} | Bots: ${interaction.guild.members.cache.filter((m) => m.user.bot).size}\`\`\``, inline: false },
                    { name: `**Server ID:**`, value: `\`\`\`${interaction.guild.id}\`\`\``, inline: true },
                    { name: `**Creation Date:**`, value: `<t:${parseInt(interaction.guild.createdTimestamp/1000)}:R>`, inline: false },
                );
            await webhookClient.send({embeds: [webhookEmbed]})
        break;
        case "set-channel":
            const channel = interaction.options.getChannel("channel");

            try {
                await channel.send({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ This channel has been set as a suggestions channel.`).setFooter({text: "This system was created by M4HD1#6336"})]}).then(async() => {
                    await DB.findOneAndUpdate({GuildID: interaction.guild.id}, {ChannelID: channel.id}, {new: true, upsert: true})
                    interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ ${channel} has successfully been set as the suggestions channel for ${interaction.guild.name}.`)]})
                })
            } catch (error) {
                if(error.message === "Missing Access") {
                    return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ The bot does not have access to this channel.`)]})
                } else {
                    return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ An error occured. \n\n \`\`\`${error}\`\`\``)]})
                }    
            }
        break;
        case "config":
            const suggestionManagers = suggestSetup.SuggestionManagers.length <= 0 || !suggestSetup.SuggestionManagers ? "None": `<@&${suggestSetup.SuggestionManagers.join(">, <@&")}>` 
            const suggestionsChannel = suggestSetup.ChannelID === "None" ? "None" : `<#${suggestSetup.ChannelID}>`
            const OwnSuggestionDelete = suggestSetup.AllowOwnSuggestionDelete ? "True" : "False"
            const suggestionSystemDisabled = suggestSetup.Disabled ? "Disabled" : "Enabled"

            const configEmbed = new MessageEmbed()
                .setColor("AQUA")
                .setTitle(`Suggestion system config for ${interaction.guild.name}`)
                .addFields(
                    {name: "Suggestions channel", value: `${suggestionsChannel}`, inline: true},
                    {name: "Disabled", value: `${suggestionSystemDisabled}`, inline: true},
                    {name: "Own suggestion delete", value: `${OwnSuggestionDelete}`, inline: true},
                    {name: "Suggestion managers", value: `${suggestionManagers}`, inline: false},
                )

            return interaction.reply({embeds: [configEmbed]})
        break;
        case "reset":
            DB.deleteOne({GuildID: interaction.guild.id})
            .then(() => {
                return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ The suggestions channel has successfully been reset.`)]})
            })
        break;
        case "enable":
            if(suggestSetup.Disabled == false)
                return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ The suggestion system is already enabled.`)]})

            await DB.findOneAndUpdate({GuildID: interaction.guild.id}, {Disabled: false})
            return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ The suggestion system has been enabled.`)]})

        break;
        case "disable":
            if(suggestSetup.Disabled == true)
                return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ The suggestion system is already disabled.`)]})

            await DB.findOneAndUpdate({GuildID: interaction.guild.id}, {Disabled: true})
            return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ The suggestion system has been disabled.`)]})

        break;
        case "suggestion-managers":
            switch(interaction.options.getString("option")) {
                case "view":
                    const suggestionManagers = suggestSetup.SuggestionManagers.length <= 0 || !suggestSetup.SuggestionManagers ? "None": `<@&${suggestSetup.SuggestionManagers.join(">, <@&")}>` 
                    return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setTitle(`Suggestion manangers for ${interaction.guild.name}`).setDescription(`Please note that these members can accept, decline and delete suggestions.\n\n${suggestionManagers}`)]})
                break;
                case "add":
                    var role = interaction.options.getRole("role")
                    if(!role)
                        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ You didn't provide a role.`)]})

                    if(suggestSetup.SuggestionManagers.includes(role.id))
                        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ ${role} is already a suggestion manager.`)]})

                    await suggestSetup.SuggestionManagers.push(role.id)
                    await suggestSetup.save()

                    return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ ${role} has been added as a suggestion manager.`)]})

                break;
                case "remove":
                    var role = interaction.options.getRole("role")
                    if(!role)
                        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ You didn't provide a role.`)]})

                    if(!suggestSetup.SuggestionManagers.includes(role.id))
                        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ ${role} isn't a suggestion manager.`)]})

                    await suggestSetup.SuggestionManagers.splice(suggestSetup.SuggestionManagers.indexOf(role.id, 1))
                    await suggestSetup.save()

                    return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ ${role} has been removed as a suggestion manager.`)]})

                break;
            }
        break;
        case "allow-own-suggestion-delete":
            const allowOwnSuggestionDelete = interaction.options.getBoolean("true-or-false");

            if(allowOwnSuggestionDelete) {
                await DB.findOneAndUpdate({GuildID: interaction.guild.id}, {AllowOwnSuggestionDelete: true})
                return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ Members can now delete their own suggestions.`)]})
            } else {
                await DB.findOneAndUpdate({GuildID: interaction.guild.id}, {AllowOwnSuggestionDelete: false})
                return interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`✅ Members can now not delete their own suggestions.`)]})
            }
        break;
    }

  },
};