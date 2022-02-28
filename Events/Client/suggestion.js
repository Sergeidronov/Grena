const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const suggestDB = require("../../Memory/Schems/SuggestDB");
const suggestSetupDB = require("../../Memory/Schems/suggestSetupDB");

module.exports = {
    name:"interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction, client) {
        if(!interaction.isButton()) return;

        if (!["suggestion-upvote", "suggestion-downvote"].includes(interaction.customId)) return;

        const suggestionsSetup = await suggestSetupDB.findOne({ GuildID: interaction.guildId });
        var suggestionsChannel;
        if(!suggestionsSetup) {
          return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Этот сервер не настроил систему предложений.`)]})
        } else {
          suggestionsChannel = interaction.guild.channels.cache.get(suggestionsSetup.ChannelID)
        }
    
        const suggestion = await suggestDB.findOne({GuildID: interaction.guild.id, MessageID: interaction.message.id})
    
        if(!suggestion)
          return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Этот [suggestion](${interaction.message.url}) не был найден в базе данных.`)], ephemeral: true});

        if(suggestion.InUse) {
            return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Пожалуйста, подождите, пока кто-то другой в настоящее время пытается повысить / понизить голос.`)], ephemeral: true});
        } else {
            suggestion.InUse = true
            await suggestion.save()
        }

        if(suggestion.UpvotesMembers.includes(interaction.member.id) && suggestion.DownvotesMembers.includes(interaction.member.id)) {

            while(suggestion.DownvotesMembers.includes(interaction.member.id)) {
                suggestion.DownvotesMembers.splice(suggestion.DownvotesMembers.indexOf(interaction.member.id, 1))
            }

            while(suggestion.UpvotesMembers.includes(interaction.member.id)) {
                suggestion.UpvotesMembers.splice(suggestion.UpvotesMembers.indexOf(interaction.member.id, 1))
            }

            await suggestion.save()

            return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Вы каким-то образом появились как в повышающих, так и в понижающих голосах, так что ваши голоса были сброшены.`)], ephemeral: true});
        }
        
        const Embed = interaction.message.embeds[0];
        if(!Embed) return;

        switch(interaction.customId) {
            case "suggestion-upvote":
                if(suggestion.UpvotesMembers.includes(interaction.member.id)) {

                    interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Вы уже проголосовали за это [suggestion](${interaction.message.url}).`)], ephemeral: true});

                } else if(suggestion.DownvotesMembers.includes(interaction.member.id)) {
                    suggestion.DownvotesMembers.splice(suggestion.DownvotesMembers.indexOf(interaction.member.id, 1))

                    suggestion.UpvotesMembers.push(interaction.member.id)

                    interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`✅ Вы проголосовали против этого [suggestion](${interaction.message.url}).`)], ephemeral: true});

                } else {

                    suggestion.UpvotesMembers.push(interaction.member.id)

                    interaction.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`✅ Вы проголосовали против этого [suggestion](${interaction.message.url}).`)], ephemeral: true});
                }                
            break;

            case "suggestion-downvote":
                if(suggestion.DownvotesMembers.includes(interaction.member.id)) {
    
                    interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Вы уже проголосовали против этого [suggestion](${interaction.message.url}).`)], ephemeral: true});

                } else if(suggestion.UpvotesMembers.includes(interaction.member.id)) { 
                    suggestion.UpvotesMembers.splice(suggestion.UpvotesMembers.indexOf(interaction.member.id, 1))

                    suggestion.DownvotesMembers.push(interaction.member.id)

                    interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`✅ Вы отклонили это предложение [suggestion](${interaction.message.url}).`)], ephemeral: true});

                } else {  

                    suggestion.DownvotesMembers.push(interaction.member.id)

                    interaction.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`✅ Вы отклонили это предложение [suggestion](${interaction.message.url}).`)], ephemeral: true});
                }
            break;
        }

        Embed.fields[3] = {name: "Upvotes", value: `${suggestion.UpvotesMembers.length}`, inline: true};
        Embed.fields[4] = {name: "Downvotes", value: `${suggestion.DownvotesMembers.length}`, inline: true};
        Embed.fields[5] = {name: "Overall votes", value: `${suggestion.UpvotesMembers.length-suggestion.DownvotesMembers.length}`, inline: true};

        await interaction.message.edit({embeds: [Embed]})

        suggestion.InUse = false
        await suggestion.save()
    }
}