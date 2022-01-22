const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");
const 
    ms
= require("ms");

module.exports = {
    name: "timeout",
    description: "Мут система",
    usage: "/timeout",
    permission: "MANAGE_MESSAGES",
    options: [{
        name: "add",
        description: "Выдача мута.",
        type: "SUB_COMMAND",
        options: [{
            name: "пользователь",
            description: "Выбор пользователя.",
            type: "USER",
            required: true
        },
        {
            name: "время",
            description: "Выбор времени наказания... [ 1 Second Up To 28 Days ]  ",
            type: "STRING",
            required: true
        },
        {
            name: "причина",
            description: "Назовите причину наказания.",
            type: "STRING",
            required: true
        }]
    },
        {
            name: "remove",
            description: "Снятие мута",
            type: "SUB_COMMAND",
            options: [{
                name: "пользователь",
                description: "Выбор пользователя.",
                type: "USER",
                required: true
            },
            {
                name: "причина",
                description: "Назовите причину наказания.",
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
        const target = options.getMember("пользователь");
        const length = options.getString("время");
        const reason = options.getString("причина") || "Причина не указана";
        const maxtime = ms("28d")
        if(length) timeInMs = ms(length);

        try {
            switch (options.getSubcommand()) {
                case "add": {
                    if (target.id === interaction.member.id)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED").setTimestamp()
                          
                        ],
                        ephemeral: true
                });
                    if (target.permissions.has("ADMINISTRATOR"))
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription(`${target.user.username} является администратором.`).setTimestamp()
                        ],  
                        ephemeral: true    
                });        
                    if(!timeInMs)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription("Укажите правильное время.").setTimestamp()
                        ],
                        ephemeral: true
                });
                    if (timeInMs > maxtime )
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription("Укажите время от 1 секунды до 28 дней.").setTimestamp()
                        ],
                        ephemeral: true
                });
                    if (reason.length > 512)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription("Причина не может содержать более 512 символов.").setTimestamp()
                        ],
                        ephemeral: true
                });
                    target.timeout(timeInMs, reason);
                        return interaction.reply({
                        embeds: [new MessageEmbed().setColor("GREEN").setTitle(`Мут был выдан!`)
                            .addFields({
                            name: "Пользователь:",
                            value: `\`\`\`${target.user.username}\`\`\``
                        }, {
                            name: "Причина:",
                            value: `\`\`\`${reason}\`\`\``
                        },{
                            name: "Время наказания:",
                            value: `\`\`\`${length}\`\`\``
                        },
                        )
                        ],
                        
                });
            }
                case "remove": {
                    if (target.permissions.has("ADMINISTRATOR"))
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription(`${target.user.username} является администратором.`).setTimestamp()
                        ],
                        ephemeral: true
                });
                    if(!target.communicationDisabledUntilTimestamp)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription(`${target.user.username} не имеет мута.`).setTimestamp()
                        ],
                        ephemeral: true
                });
                        await target.timeout(null)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setColor("GREEN").setTitle("Мут был снят!")
                            .addFields({
                            name: "Пользователь:",
                            value: `\`\`\`${target.user.username}\`\`\``
                        },
                        {
                            name: "Причина:",
                            value: `\`\`\`${reason}\`\`\``
                        },
                        )
                        ],
                        
                });
                }
                return;
            }
        } catch (e) {
        const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`🛑 Ошибка: ${e}`)
        return interaction.reply({
            embeds: [errorEmbed]
        })
        }
    }
}   