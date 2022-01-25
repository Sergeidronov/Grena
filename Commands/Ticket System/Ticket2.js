const {MessageEmbed, CommandInteraction} = require("discord.js");
const DB = require("../../Memory/Schems/Tickets");

module.exports = {
    name: "ticket2",
    description: "Ticket Actions.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "action",
            type: "STRING",
            description: "Add or Remove a member",
            required: true,
            choices: [
                {name: "Add", value: "add"},
                {name: "Remove", value: "remove"},
            ]
        },
        {name: "member",
        description: "Select a member",
        type: "USER",
        required: true,
    },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction){
        const {guildId, options, channel} = interaction;

        const Action = options.getString("action");
        const Member = options.getMember("member");

        const Embed = new MessageEmbed();

        switch(Action) {
            case "add":
                DB.findOne(
                    { GuildID: guildId, СhannelID: channel.id},
                    async (err, docs) => {
                        if(err) throw err;
                        if(!docs)
                        return interaction.reply({
                            embeds: [
                                Embed.setColor("RED").setDescription(
                                    "⛔ | This channel is not ticket"
                                )
                            ],
                            ephemeral: true,
                        });
                        if (docs.MembersID.includes(Member.id))
                        return interaction.reply({
                            embeds: [
                                Embed.setColor("RED").setDescription(
                                    "⛔ | This member is added ticket"
                                ),
                            ],
                            ephemeral: true,
                        });
                        docs.MembersID.push(Member.id);

                        channel.permissionOverwrites.edit(Member.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            READ_MESSAGE_HISTORY: true,
                        });

                        interaction.reply({
                            embeds: [Embed.setColor("GREEN")
                            .setDescription(
                            `✅ | ${Member} Has been added`)
                        ]
                    }
                            )
                            docs.save();

                    }
                    
                    
                );
                break;
                case "remove":
                    DB.findOne(
                        {GuildID: guildId, ChannelID: channel.id},
                        async (err, docs) => {
                            if(err) throw err;
                            if(!docs)
                            return interaction.reply({
                                embeds: [
                                    Embed.setColor("RED").setDescription(
                                        "⛔ | This channel is not ticket"
                                    )
                                ],
                                ephemeral: true,
                            });
                            if (docs.MembersID.includes(Member.id))
                            return interaction.reply({
                                embeds: [
                                    Embed.setColor("RED").setDescription(
                                        "⛔ | This member is not in this ticket"
                                    ),
                                ],
                                ephemeral: true,
                            });
                            docs.MembersID.remove(Member.id);
    
                            channel.permissionOverwrites.edit(Member.id, {
                                VIEW_CHANNEL: false,
                            });
    
                            interaction.reply({embeds: [Embed.setColor("GREEN").setDescription(
                                `✅ | ${Member} Has been remove from this ticket`
                                ),
                            ]
                        });
    
                                docs.save();
                        }
                    );
                    break;
        }
    },

};