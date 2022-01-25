const {Client, CommandInteraction, MessageEmbed} = require('discord.js');
const db = require("../../Memory/Schems/WarningDB");

module.exports = {
    name: "warnings",
    description: "Warnings System.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "add",
            description: "adds",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "target",
                    description: "Select a target",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "Provide a reason",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "evidence",
                    description: "Provide evidence",
                    type: "STRING",
                    required: false,
                }
                
            ]
        },
        {
            name: "check",
            description: "check",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "target",
                    description: "Select a target",
                    type: "USER",
                    required: true,
                }
            ]
        },
        {
            name: "remove",
            description: "remove",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "target",
                    description: "Select a target",
                    type: "USER",
                    required: true,
                },
                {
                    name: "warnid",
                    description: "yryrty",
                    type: "NUMBER",
                    required: true,
                },

            ]
        },
        {
            name: "clear",
            description: "clear",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "target",
                    description: "Select a target",
                    type: "USER",
                    required: true,
                }
            ],
        }
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client, arguments) {
        const Sub = interaction.options.getSubcommand(["add", "check", "remove", "clear"]);
        const Target = interaction.options.getMember("target");
        const Reason = interaction.options.getString("reason");
        const Evidence = interaction.options.getString("evidence") || "None provide.";
        const WarnId = interaction.options.getNumber("warnid");
        const WarnDate = new Date(interaction.createdTimestamp).toLocaleDateString();

        if(Sub === `add`) {

            db.findOne({GuildID: interaction.guildId, UserID: Target.id, UserTag: Target.user.tag }, async (err, data) => {
                if(err) throw err;
                if(!data) {
                    data =  new db ({
                        GuildID: interaction.guildId,
                        UserID: Target.id,
                        UserTag: Target.user.tag,
                        Content: [
                            {
                                ExecuterID: interaction.user.id,
                                ExecuterTag: interaction.user.tag,
                                Reason: Reason,
                                Evidence: Evidence,
                                Date: WarnDate
                            }
                             
                        ],

                    })
                } else {
                    const obj = {
                        ExecuterID: interaction.user.id,
                                ExecuterTag: interaction.user.tag,
                                Reason: Reason,
                                Evidence: Evidence,
                                Date: WarnDate

                    }
                    data.Content.push(obj)
                }
                data.save()
            })

            interaction.reply({embeds: [new MessageEmbed()
                .setTitle("Warning System")
            .setColor("RED")
        .setDescription(`Warn add ${Target.user.id} | || ${Target.id}||\n **Reason**: ${Reason}\n**Evidence**: ${Evidence}}`)]});









        } else if(Sub === "check") {






        } else if(Sub === "remove") {






        }else if(Sub === "clear") {}




    }
}