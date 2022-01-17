const { CommandInteraction,  MessageEmbed} = require("discord.js");
const  ms= require("ms");

module.exports = {
    name: "timeout",
    description: "Mute System",
    usage: "/timeout",
    permission: "ADMINISTRATOR",
    options: [{
        name: "add",
        description: "Выдача мута.",
        type: "SUB_COMMAND",
        options: [{
            name: "user",
            description: "Выберите пользователя.",
            type: "USER",
            required: true
        },
        {
            name: "length",
            description: "Укажите время наказания. ",
            type: "STRING",
            required: true
        },
        {
            name: "reason",
            description: "Выберите причину снятия мута.",
            type: "STRING",
            required: true
        }]
    },
        {
            name: "remove",
            description: "Снятие мута с пользователя.",
            type: "SUB_COMMAND",
            options: [{
                name: "user",
                description: "Выберите пользователя.",
                type: "USER",
                required: true
            },
            {
                name: "reason",
                description: "Выберите причину снятия мута.",
                type: "STRING",
                required: true
            }
            ]
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
     async execute(interaction) {
        const options = interaction.options
        const target = options.getMember("user");
        const length = options.getString("length");
        const reason = options.getString("reason") || "No Reason Provided";
        const maxtime = ms("28d")
        if(length) timeInMs = ms(length);

        try {
            switch (options.getSubcommand()) {
                case "mute": {
                    if (target.id === interaction.member.id)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
                            .setDescription(`Hey... ${interaction.user.username} Why Are You Trying To Mute Yourself....?`).setTimestamp()
                        ],
                        ephemeral: true
                });
                    if (target.permissions.has("ADMINISTRATOR"))
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
                            .setDescription(`${target.user.username} Is An Admin....?`).setTimestamp()
                        ],  
                        ephemeral: true    
                });        
                    if(!timeInMs)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
                            .setDescription("Please Specify A Valid Time!").setTimestamp()
                        ],
                        ephemeral: true
                });
                    if (timeInMs > maxtime )
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
                            .setDescription("Please Specify A Time Between 1 Second, And 28 Days!").setTimestamp()
                        ],
                        ephemeral: true
                });
                    if (reason.length > 512)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
                            .setDescription("Reason Can't Be More Than 512 Characters").setTimestamp()
                        ],
                        ephemeral: true
                });
                    target.timeout(timeInMs, reason);
                        return interaction.reply({
                        embeds: [new MessageEmbed().setColor("GREEN").setTitle(`Successfully Muted!`)
                            .addFields({
                            name: "User:",
                            value: `\`\`\`${target.user.username}\`\`\``
                        }, {
                            name: "Reason:",
                            value: `\`\`\`${reason}\`\`\``
                        },{
                            name: "Time Of Mute:",
                            value: `\`\`\`${length}\`\`\``
                        },
                        )
                        ],
                        ephemeral: true
                });
            }
                case "unmute": {
                    if (target.permissions.has("ADMINISTRATOR"))
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
                            .setDescription(`${target.user.username} Is An Admin....?`).setTimestamp()
                        ],
                        ephemeral: true
                });
                    if(!target.communicationDisabledUntilTimestamp)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Error ❌").setColor("RED")
                            .setDescription(`${target.user.username} Isn't Muted?`).setTimestamp()
                        ],
                        ephemeral: true
                });
                        await target.timeout(null)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setColor("GREEN").setTitle("Successfully Unmuted!")
                            .addFields({
                            name: "User:",
                            value: `\`\`\`${target.user.username}\`\`\``
                        },
                        {
                            name: "Reason:",
                            value: `\`\`\`${reason}\`\`\``
                        },
                        )
                        ],
                        ephemeral: true
                });
                }
                return;
            }
        } catch (e) {
        const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`🛑 Error: ${e}`)
        return interaction.reply({
            embeds: [errorEmbed]
        })
        }
    }
}   