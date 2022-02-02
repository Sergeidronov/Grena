const {ButtonInteraction} = require("discord.js");
const DB = require("../../Memory/Schems/suggestdbs");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;
        const   {guildId, customId, message} = interaction;
        if (!["suggest-accept", "suggest-decline"].includes(customId)) return;
        if(!interaction.member.permissions.has("ADMINISTRATOR"))
        return interaction.reply({content: "Недостаточно прав для использования", ephemeral: true})
        ;

        

        DB.findOne({GuildID: guildId, MessageID: message.id},  async(err,data) => {
            if(err) throw err;
            if(!data) return interaction.reply({content: "В базе данных не было найдено никаких данных.", ephemeral: true});
            

            const Embed = message.embeds[0];
            
            if(!Embed) return;

            switch(customId) {
                case "suggest-accept": {
                    Embed.fields[2] = {name:"Статус", value: "Принято", inline: true};
                    message.edit({embeds: [Embed.setColor("GREEN")]});
                    return interaction.reply({content: "✅ Предложения принято", components: [], ephemeral: true})

                }
                break;
                case "suggest-decline": {
                    Embed.fields[2] = {name:"Статус", value: "Отклонено", inline: true};
                    message.edit({embeds: [Embed.setColor("RED")]});
                    return interaction.reply({content: "⛔ Предложения отклонено", components: [], ephemeral: true})

                }
                break;
            }
        })
    }
}
