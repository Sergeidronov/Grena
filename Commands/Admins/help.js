const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Feeling lost ❓',
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async execute(interaction, client) {
		const help = new MessageEmbed()
			.setTitle('<:generalChat:934476109989425252> Guardian Help Menu')
			.setColor('BLUE')
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
			.setDescription('To see all my cmds press the buttons below')
			.setFields(
				{
					name: '<:info:935072188233547806> Info',
					value: `\`7 Information cmds\``,
					inline: true
				}, {
				name: '<:util:935089387040022579> Utility',
				value: `\`3 Utility cmds\``,
				inline: true
			}, {
				name: '<:premium:929433743599489044> Premium',
				value: `\`2 Premium cmds\``,
				inline: true
			}, {
				name: '<:Ticket:935077407554146345> Ticket',
				value: `\`3 Ticket cmds\``,
				inline: true
			}, {
				name: '<:moderation:935075898862993439> Moderation',
				value: `\`10 Moderation cmds\``,
				inline: true
			}, {
				name: '<:utility:935073407387725924> Configuration',
				value: `\`2 Configuration cmds\``,
				inline: true
			}
			)
			.setTimestamp()
			.setFooter({ text: 'Thank you for choosing guardian' })

		const embed1 = new MessageEmbed()
			.setTitle('Information Commands')
			.setDescription(`\`botinfo\`, \`help\`, \`links\`, \`membercount\`, \`status\`, \`serverinfo\`, \`userinfo\``)
			.setColor('2e3137')
			.setTimestamp()

		const embed2 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Utility Commands')
			.setDescription(`\`afk\`, \`avatar\`, \`embed\``)
			.setTimestamp()

		const embed3 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Premium Commands')
			.setDescription(`\`/premium redeem\`, \`premium info\``)
			.setTimestamp()

		const embed4 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Ticket Commands')
			.setDescription(`\`ticket\`, \`ticketsetup\``)
			.setTimestamp()

		const embed5 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Moderation Commands')
			.setDescription(`\`ban\`, \`btnroles\`, \`clear\`, \`lock\`, \`unlock\`, \`nickname\`, \`say\`, \`slowmode\`, \`timeout\`, \`role add\`, \`role remove\`, \`role create\`, \`role delete\``)
			.setTimestamp()

		const embed6 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Configuration Commands')
			.setDescription(`\`/welcomesetup\``)
			.setTimestamp()


		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('935072188233547806')
					.setCustomId('info'),

				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('935089387040022579')
					.setCustomId('utility'),

				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('929433743599489044')
					.setCustomId('premium'),

				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('935077407554146345')
					.setCustomId('ticket'),

				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('moderation:935075898862993439')
					.setCustomId('moderation'),


			)

		const row2 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('SECONDARY')
					.setCustomId('configuration')
					.setEmoji('935073407387725924')
			)

		const row3 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setEmoji('930143460277751808')
					.setURL('https://discord.com/api/oauth2/authorize?client_id=912773129183563776&permissions=1099917896758&scope=bot%20applications.commands')
					.setLabel('Invite Guardian')
			)

		const row4 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('935072188233547806')
					.setCustomId('info'),

				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('935089387040022579')
					.setCustomId('utility'),

				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('929433743599489044')
					.setCustomId('premium'),

				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('935077407554146345')
					.setCustomId('ticket'),

				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('moderation:935075898862993439')
					.setCustomId('moderation'),

			)

		const row5 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setCustomId('configuration')
					.setEmoji('935073407387725924')
			)

		const msg = interaction.reply({ embeds: [help], components: [row, row2] })

		const collector = interaction.channel.createMessageComponentCollector({
			time: 1000 * 60
		});

		collector.on('collect', async interaction => {
			if (interaction.customId === 'info') {
				await interaction.reply({ embeds: [embed1], components: [row3], ephemeral: true })
			} else if (interaction.customId === 'utility') {
				await interaction.reply({ embeds: [embed2], components: [row3], ephemeral: true })
			} else if (interaction.customId === 'premium') {
				await interaction.reply({ embeds: [embed3], components: [row3], ephemeral: true })
			} else if (interaction.customId === 'ticket') {
				await interaction.reply({ embeds: [embed4], components: [row3], ephemeral: true })
			} else if (interaction.customId === 'moderation') {
				await interaction.reply({ embeds: [embed5], components: [row3], ephemeral: true })
			} else if (interaction.customId === 'configuration') {
				await interaction.reply({ embeds: [embed6], components: [row3], ephemeral: true })
			}
		})

		collector.on('end', async () => {
			interaction.editReply({
				embeds: [help],
				components: [row4, row5]
			})
		})
	}
}