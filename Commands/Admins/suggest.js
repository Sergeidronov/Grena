const {CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const DB = require("../../Memory/Schems/suggestdbs");

module.exports = {
    name: "suggest",
    description: "Suggest",
    options: [
        {
            name: "сервер",
            description: "test",
            type: "STRING",
            required: true,
            choices: [
                {name: "RP", value: "RP"},
                {name: "BW", value: "BW"},
                {name: "Discord", value: "Discord"}
            ]
        },
        {
            name: "предложение",
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

        const Type2 = options.getString("сервер");
        const Suggestion = options.getString("предложение");
        
        const Embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
        .addFields(
            {name: "Статус:", value: "Рассматривается", inline: false},
            {name: "Сервер:", value: Type2, inline: false},
            {name: "Предложение:", value: Suggestion, inline: false},
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
                    Suggestion: Suggestion
                }
            ]})

        } catch (err) {
            console.log(err);
        }

    }
}