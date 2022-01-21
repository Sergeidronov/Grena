const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Memory/Schemas/LeaveSetupDB");

module.exports = {
    name: "leavesetup",
    description: "Leave System Setup",
    permissions: "ADMINISTRATOR",
    options: [
        {
            name: "logs",
            description: "Select the log channel you want your leave system to be.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guild, user } = interaction;

        try{
            const Logs = options.getChannel("logs")

            await DB.findOneAndUpdate(
                { GuildID: guild.id },
                { Logs: Logs.id},
                { 
                    new: true,
                    upsert: true,
                },
            );

            const LeaveSetup = new MessageEmbed()
            .setDescription(
                "Successfully setup the leave system"
              )
              .setColor("GREEN");

            await guild.channels.cache
                .get(Logs.id)
                .send({ embeds: [LeaveSetup] })
                .then((m) => {
                    setTimeout(() => {
                    m.delete().catch(() => {});
                }, 1 * 7500);
            });

            interaction.reply({
                content: "Done",
                ephemeral: true,
              });

        } catch(err) {
            const errEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle(
          "An error occurred while setting up the welcome system"
        )
        .setDescription(`\`\`\`${err}\`\`\``);
        
      interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}