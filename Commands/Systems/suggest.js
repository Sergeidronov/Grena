const {CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const DB = require("../../Memory/Schems/suggestdbs");

module.exports = {
    name: "suggest",
    description: "Suggest",
    options: [
        {
            name: "type",
            description: "Select an option",
            type: "STRING",
            required: true,
            choices: [
                {name: "Command", value: "Command"},
                {name: "Event Listener", value: "Event Listener"},
                {name: "System", value: "System"},
                {name: "Other", value: "Other"}
            ]
        },
        {
            name: "suggestion",
            description: "Describe",
            type: "STRING",
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const {options, guildId, member, user} = interaction;

        const Type = options.getString("type");
        const Suggestion = options.getString("suggestion");
        
        const Embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
        .addFields(
            {name: "Suggestion:", value: Suggestion, inline: false},
            {name: "Type:", value: Type, inline: true},
            {name: "Status:", value: "Pending", inline: true}
        )
        .setTimestamp()

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton().setCustomId("suggest-accept").setLabel("✅ Accept").setStyle("PRIMARY"),
            new MessageButton().setCustomId("suggest-decline").setLabel("⛔ Decline").setStyle("PRIMARY")

        )

        try {

            const M = await interaction.reply({embeds: [Embed], components: [Buttons], fetchReply: true});
            
            await DB.create({GuildID: guildId, MessageID: M.id, Details: [
                {
                    MemberID: member.id,
                    Type: Type,
                    Suggestion: Suggestion
                }
            ]})

        } catch (err) {
            console.log(err);
        }

    }
}