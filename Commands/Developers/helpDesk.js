const { CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, MessageReaction, Collector} = require('discord.js');

module.exports = {
    name: 'helpdesk',
    description: 'setup help desk',
    permissions: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {

        const row1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('1️⃣')
            .setCustomId('1'),
            
            new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('2️⃣')
            .setCustomId('2'),

            new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('3️⃣')
            .setCustomId('3'),

            new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('4️⃣')
            .setCustomId('4'),

            new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('5️⃣')
            .setCustomId('5'),
        )

        const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('6️⃣')
            .setCustomId('6'),

            new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('7️⃣')
            .setCustomId('7'),

            new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('8️⃣')
            .setCustomId('8'),

            new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('9️⃣')
            .setCustomId('9'),

            new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('🤚')
            .setCustomId('10'),
        )

        const row3 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setEmoji('930143460277751808')
            .setLabel('Invite Guardian')
            .setStyle('LINK')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=912773129183563776&permissions=1101525167126&scope=bot%20applications.commands')
        )

        const row4 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Buy Premium')
            .setStyle('LINK')
            .setURL('https://ko-fi.com/guardianbott/tiers')
            .setEmoji('929433743599489044')
        )
        


        const desk = new MessageEmbed()
        .setTitle('Help Desk')
        .setDescription(`:one: **How can i invite Guardian**\n
        :two: **How i do i report a user or a bug** \n
        :three:  **What data the bot stores? Will my data be leaked?** \n
        :four:  **How do i get Premium? How do i reedem the perks?** \n
        :five: **Is there refund for premium?** \n
        :six: **Is bot openSource , how can i become moderator ?** \n
        :seven: **Will i get rewarded for helping members on help channels?**\n
        :eight: **How can i become a beta tester?** \n
        :nine: **How recently does bot get updated?** \n
        🤚 **My question was not answered**`)
        .setFooter('Click 🤚 to get support')
        .setColor('DARK_BLUE')

        interaction.reply({content: 'Done', ephemeral: true})

       interaction.channel.send({embeds: [desk], components: [row1, row2]})

       const collector = interaction.channel.createMessageComponentCollector();

       collector.on('collect', async i => {
           if(i.customId === '1') {
               await i.reply({embeds: [new MessageEmbed().setDescription('You can invite Guardian by simply pressing the button below').setColor('YELLOW').setFooter({text: 'Guardian Helper'})], components: [row3], ephemeral: true})
           }
           if(i.customId === '2') {
               await i.reply({embeds: [new MessageEmbed().setDescription(`In order to report a user simpy dm anyone with <@&914554015415697418> and provide proof of user breaking bots rules`).setColor('YELLOW').setFooter({text: 'Guardian Helper'})], ephemeral: true})
           }
           if(i.customId === '3') {
               await i.reply({embeds: [new MessageEmbed().setDescription(`Guardian stores only channels and roles id on [MongoDB](https://www.mongodb.com/) and stored privately and nobody got access to it except the dev team. Guardian will **never** leak any data.`).setColor('YELLOW').setFooter({text: 'Guardian Helper'})], ephemeral: true})
           }
           if(i.customId === '4') {
               await i.reply({embeds: [new MessageEmbed().setDescription(`You can buy premium and see all premium perks by clicking the button below`).setColor('YELLOW').setFooter({text: 'Guardian Helper'})], components: [row4], ephemeral: true})
           }
           if(i.customId === '5') {
               await i.reply({embeds: [new MessageEmbed().setDescription(`Yes there is refund for users if they ask, and after refund their premium services will be removed until you buy premium again. To ask for refund open a ticet on <#925402791592202321>`).setColor('YELLOW').setFooter({text: 'Guardian Helper'})], ephemeral: true})
           }
           if(i.customId === '6') {
               await i.reply({embeds: [new MessageEmbed().setDescription('Sadly bot is not opensource and we wont plan to make it, but luckily for you mod apps open every few weeks to get new moderators to moderate server').setColor('YELLOW').setFooter({text: 'Guardian Text'})], ephemeral: true})
           }
           if(i.customId === '7') {
               await i.reply({embeds: [new MessageEmbed().setDescription(`Yes you will be rewarded for helping, if a member of dev team thinks you deserve it you will get rewarded with <@&930146940207898625>`).setColor('YELLOW').setFooter({text: 'Guardian Helper'})], ephemeral: true})
           }
           if(i.customId === '8') {
               await i.reply({embeds: [new MessageEmbed().setDescription('No you cant, beta testers are very limited and trusted by devs guys :/').setColor('YELLOW').setFooter({text: 'Guardian Helper'})], ephemeral: true})
           }
           if(i.customId === '9') {
               await i.reply({embeds: [new MessageEmbed().setDescription('Bot gets updated once a week with new things beeing added and bugs getting fixed').setColor('YELLOW').setFooter({text: 'Guardian Helper'})], ephemeral: true})
           }
           if(i.customId === '10') {
               await i.reply({embeds: [new MessageEmbed().setDescription(`Your questions isnt answered? Sad to hear that now head to <#923554630124830740>`).setColor('YELLOW').setFooter({text: 'Guardian Helper'})], ephemeral: true})
           }
       })
       
        }
    }