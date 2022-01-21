const {ButtonInteraction} = require("discord.js");
const DB = require("../../Memory/Schems/SuggestDB");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;
        if(!interaction.member.permissions.has("ADMINISTRATOR"))
        return interaction.reply({content: "You cannot use the button", ephemeral: true});

        const   {guildId, customId, message} = interaction;

        DB.findOne({GuildID: guildId, MessageID: message.id},  async(err,data) => {
            if(err) throw err;
            if(!data) return interaction.reply({content: "No data was found in the database",  ephemeral: true});

            const Embed = message.embeds[0];
            if (!["suggest-accept", "suggest-decline"].includes(customId)) return;
            if(!Embed) return;

            switch(customId) {
                case "suggest-accept": {
                    Embed.fields[2] = {name:"Status", value: "Accepted", inline: true};
                    message.edit({embeds: [Embed.setColor("GREEN")]});
                    return interaction.reply({content: "Suggestion Accepted", components: [], ephemeral: true})

                }
                break;
                case "suggest-decline": {
                    Embed.fields[2] = {name:"Status", value: "Declined", inline: true};
                    message.edit({embeds: [Embed.setColor("GREEN")]});
                    return interaction.reply({content: "Suggestion Declined", components: [], ephemeral: true})

                }
                break;
            }
        })
    }
}
