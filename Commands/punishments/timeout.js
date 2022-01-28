const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");
const 
    ms
= require("ms");

module.exports = {
    name: "timeout",
    description: "Mute System",
    usage: "/timeout",
    permission: "MANAGE_MESSAGES",
    options: [{
        name: "mute",
        description: "Timeout A User",
        type: "SUB_COMMAND",
        options: [{
            name: "user",
            description: "Provide A User To The Timeout.",
            type: "USER",
            required: true
        },
        {
            name: "length",
            description: "Provide Length For Timeout... [ 1 Second Up To 28 Days ]  ",
            type: "STRING",
            required: true
        },
        {
            name: "reason",
            description: "Provide A Reason For The Timeout",
            type: "STRING",
            required: true
        }]
    },
        {
            name: "unmute",
            description: "Untimeout A User",
            type: "SUB_COMMAND",
            options: [{
                name: "user",
                description: "Provide A User To Untimeout.",
                type: "USER",
                required: true
            },
            {
                name: "reason",
                description: "Provide A Reason For The Untimeout",
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
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription(`${interaction.user.username} ты не можешь себя заглушить`).setTimestamp()
                        ],
                        ephemeral: true
                });
                    if (target.permissions.has("ADMINISTRATOR"))
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription(`${target.user.username} Является Администратором.`).setTimestamp()
                        ],  
                        ephemeral: true    
                });        
                    if(!timeInMs)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription("Пожалуйста, укажите действительное время!").setTimestamp()
                        ],
                        ephemeral: true
                });
                    if (timeInMs > maxtime )
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription("Пожалуйста, укажите время от 1 секунды до 28 дней!").setTimestamp()
                        ],
                        ephemeral: true
                });
                    if (reason.length > 512)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription("Причина не может содержать более 512 символов").setTimestamp()
                        ],
                        ephemeral: true
                });

                const DMEmbed = new MessageEmbed()
			.setTitle(`Вам был выдан мут `)
			.setColor('RED')
			.setTimestamp()
			.addFields({
				name: "Причина:",
				value: reason
			}, 
            {
				name: "Время:",
				value: length
			},
            {
				name: "Выдал",
				value: interaction.member.user.tag
			}, );

		await target.send({
			embeds: [DMEmbed]
		}).catch((err) => {
			console.log(err)
		});




                    target.timeout(timeInMs, reason);
                        return interaction.reply({
                        embeds: [new MessageEmbed().setColor("GREEN").setTitle(`Успешно выдан мут`)
                            .addFields({
                            name: "Пользователь:",
                            value: `\`\`\`${target.user.username}\`\`\``
                        }, {
                            name: "Причина:",
                            value: `\`\`\`${reason}\`\`\``
                        },{
                            name: "Время мута:",
                            value: `\`\`\`${length}\`\`\``
                        },
                        )
                        ],
                        ephemeral: false }
                );

            }
                case "unmute": {
                    if (target.permissions.has("ADMINISTRATOR"))
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription(`${target.user.username} Является Администратором`).setTimestamp()
                        ],
                        ephemeral: true
                });
                    if(!target.communicationDisabledUntilTimestamp)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
                            .setDescription(`${target.user.username} и так не имеет мут`).setTimestamp()
                        ],
                        ephemeral: true
                });
                        await target.timeout(null)
                        return interaction.reply({
                        embeds: [new MessageEmbed().setColor("GREEN").setTitle("Мут успешно снят")
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
                        ephemeral: false
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