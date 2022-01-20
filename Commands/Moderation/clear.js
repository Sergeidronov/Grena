const { CommandInteraction, MessageEmbed } = require("discord.js");




module.exports = {
    name: "clear",
    description: "Deletes a specified number of messages from a channel or a target.",
    permissions: "ADMINISTRATOR",
        /**
     * @param {CommandInteraction} interaction
     */
    options: [
        {
            name: "amount",
            description: "Select the amount of messages to delete from a channel or a target.",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",description: "Select a target to clear their messages.",
            type: "USER",
            required: false
        }
    ],
    async execute(interaction) {
        
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("RANDOM");

        if(Amount > 100 || Amount <= 0) {
            Response.setDescription(`Amount cannot exceed 100, and cannot be under 1.`)
            return interaction.reply({embeds: [Response]})
        }
        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} from ${target.id}.`);
                interaction.reply({embeds: [Response]})
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} from this channel.`);
                interaction.reply({ embeds: [Response] })
            })
        }
    }
}
