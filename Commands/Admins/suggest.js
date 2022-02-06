const {CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const DB = require("../../Memory/Schems/suggestdbs");

module.exports = {
    name: "suggest",
    description: "Suggest",
    options: [
        {
            name: "1",
            description: "Оцените ваши знания в использовании дискорда (0/5)",
            type: "STRING",
            required: true,
            choices: [
                {name: "1", value: "1"},
                {name: "2", value: "2"},
                {name: "3", value: "3"},
                {name: "4", value: "4"},
                {name: "5", value: "5"},
            ],
        },
        {
            name: "2",
            description: "Оцените ваше знание и понимание правил нашего дискорд сервера (0/5)",
            type: "STRING",
            required: true,
            choices: [
                {name: "1", value: "1"},
                {name: "2", value: "2"},
                {name: "3", value: "3"},
                {name: "4", value: "4"},
                {name: "5", value: "5"},
            ],
        },
        {
            name: "3",
            description: "Ваш суточный онлайн в дискорде",
            type: "STRING",
            required: true,
            choices: [
                {name: "1-4ч", value: "1"},
                {name: "5-10ч", value: "2"},
                {name: "10-15ч", value: "3"},
                {name: "15-20ч", value: "4"},
                {name: "20-24ч", value: "5"},
            ],
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const {options, guildId, member, user} = interaction;

        const Type1 = options.getString("1");
        const Type2 = options.getString("2");
        const typ3 = options.getString("3");

        const Embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
        .addFields(
            {name: "Оценка знаний в использовании дискорда:", value: Type1, inline: false},
            {name: "Оценка знаний и понимания правил дискорд сервера", value: Type2, inline: false},
            {name: "Суточный онлайн в дискорде", value: typ3, inline: false},
            {name: "Статус:", value: "Рассматривается", inline: false},
            
        )
        .setTimestamp()

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton().setCustomId("suggest-accept").setLabel("✅ Принять").setStyle("PRIMARY"),
            new MessageButton().setCustomId("suggest-decline").setLabel("⛔ Отклонить").setStyle("PRIMARY")

        )

        try {

            const M = await interaction.reply({embeds: [Embed], components: [Buttons], fetchReply: true});
            
            await DB.create({GuildID: guildId, MessageID: M.id, Details: [
                {
                    MemberID: member.id,
                    typ3: typ3,
                }
            ]})

        } catch (err) {
            console.log(err);
        }

    }
}