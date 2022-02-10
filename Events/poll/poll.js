const   { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Message } = require('discord.js'),
        client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });
        client.db = require("quick.db");


module.exports = {
    name:'interactionCreate',
    /**
     * @param {CommandInteraction} interaction
     * @param {Message} message
     */

    
    
    async execute (interaction, message) {

        if (interaction.isCommand()) {
            if (interaction.commandName == "poll") {
        
          
        let time = interaction.options.getInteger("time"); time = time < 1 ? 1 : time > 60 * 24 * 7 ? 60 * 24 * 7 : time;
        let poll = {
            question: interaction.options.getString("question"),
            answer1: interaction.options.getString("answer1"),
            answer1_votes: 0,
            answer2: interaction.options.getString("answer2"),
            answer2_votes: 0,
            answer3: interaction.options.getString("answer3") ?? undefined, // if interaction.options.getString("answer3") == null {interaction.options.getString("answer3") = undefined}
            answer3_votes: 0,
            answer4: interaction.options.getString("answer4") ?? undefined,
            answer4_votes: 0,
            answer5: interaction.options.getString("answer5") ?? undefined,
            answer5_votes: 0,
            members: [],
            startDate: interaction.createdTimestamp,
            endDate: (interaction.createdTimestamp + 1000 * 60 * time)
        };
        let components = [];
        for (let i = 1; i <= 5; i++) {
            if (poll[`answer${i}`] != undefined) {
                components.push(
                    new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel(`${poll[`answer${i}`]} [0]`)
                                .setStyle("PRIMARY")
                                .setCustomId(`answer${i}`)
                        )
                );
            }
        }
        const channel = await interaction.channel;
            const message = await channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle(poll.question)
                        .setDescription(`Дата окончания голосования: <t:${~~(poll.endDate/1000)}:F>`) // 0.5 ; ~~0.5 = 0;
                        .setAuthor({
                            name: interaction.member.displayName, 
                            iconURL: interaction.member.displayAvatarURL(),
                            url: `https://discordapp.com/users/${interaction.user.id}/`
                        })
                ],
                components: components
            });
            client.db.set(`polls.p${message.id}`, poll);
            interaction.reply({
                content: `Голосование было создано:\nhttps://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`,
                ephemeral: true
            });
            message.startThread( { name: `[Обсуждение] ${poll.question.substring(0, 20)}` } )
                .then(async (thread) => {
                    thread.send(`${interaction.user}`).then((m) => m.delete() );
                    thread.send(`Голосуйте здесь:\nhttps://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
                });

                if (time > 1) interaction.guild.scheduledEvents.create({
                    name: `[Голосование] ${poll.question}`,
                    scheduledStartTime: poll.startDate + (1000 * 60),
                    scheduledEndTime: poll.endDate,
                    privacyLevel: `GUILD_ONLY`,
                    entityType: `EXTERNAL`,
                    description: `Голосование: ${poll.question}\nот ${interaction.member.displayName}`,
                    entityMetadata: {
                        location: `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
                    },
                    reason: `Голосование: "${poll.question}" от ${interaction.member.displayName}`
                });
                
                }
    }
    if (interaction.isButton()) {
        if (interaction.customId.match(/(answer)([12345])/i)) {
            const db = client.db.get(`polls.p${interaction.message.id}`);
            if (interaction.createdTimestamp > db.endDate) {
                let higest = indexOfMax([db[`answer1_votes`], db[`answer2_votes`], db[`answer3_votes`], db[`answer4_votes`], db[`answer5_votes`]]); 
                let components = [];
                for (let i = 1; i <= 5; i++) {
                    if (db[`answer${i}`] != undefined) {
                        components.push(
                            new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setLabel(`${db[`answer${i}`]} [${db[`answer${i}_votes`]}]`) 
                                        .setStyle(higest + 1 == i ? "SUCCESS": "DANGER")
                                        .setDisabled(true)
                                        .setCustomId(`answer${i}`)
                                )
                        );
                    }
                }
                interaction.message.edit({
                    embeds: interaction.message.embeds,
                    components: components
                });
                return interaction.reply({
                    content: `🚫 Голосование законченно!`,
                    ephemeral: true
                });
            }
            if (db.members.includes(interaction.user.id)) {
                return interaction.reply({
                    content: `🚫 Вы уже проголосовали!`,
                    ephemeral: true
                });
            }
            client.db.push(`polls.p${interaction.message.id}.members`, interaction.user.id);
            let components = [];
            for (let i = 1; i <= 5; i++) {
                if (db[`answer${i}`] != undefined) {
                    components.push(
                        new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setLabel(`${db[`answer${i}`]} [${db[`answer${i}_votes`] + (interaction.customId == `answer${i}` ? 1 : 0)}]`) 
                                    .setStyle("PRIMARY")
                                    .setCustomId(`answer${i}`)
                            )
                    );
                    if (interaction.customId == `answer${i}`) {
                        client.db.add(`polls.p${interaction.message.id}.answer${i}_votes`, 1);
                    }
                }
            }
            interaction.message.edit({
                embeds: interaction.message.embeds,
                components: components
            });
            return interaction.reply({
                content: `Ваш выбор сохранен!`,
                ephemeral: true
            });
        }
    }


function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

}
       
}
       
    

