const {
	CommandInteraction,
	MessageEmbed,
	GuildMember
} = require("discord.js");


module.exports = {
	name: "kick",
	description: "Kicks Target",
	permission: "KICK_MEMBERS",
	usage: "/Kick [Target] [REASON] [MESSAGES]",
	options: [{
			name: "пользователь",
			description: "Выберите пользователя.",
			type: "USER",
			required: true
		},
		{
			name: "причина",
			description: "Назовите причину наказания.",
			type: "STRING",
			required: true
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const options = interaction.options
		const target = options.getMember("пользователь");
		const user = interaction.member
		const name = interaction.commandName
		const reason2 = "Invalid Permissions"
		const per = this.permission

		const Embed1 = new MessageEmbed()
			.setTitle("❌ Ошибка при выполнении команды ❌")
			.setColor("RED")
			.setTimestamp()
			.addFields(
			{
				name: "Команда:",
				value: name
			}, 
			{
				name: "Причина:",
				value: reason2
			},
			 {
				name: "Необходимые права:",
				value: per
			})

		if (!user.permissions.has("KICK_MEMBERS"))
			return interaction.reply({
				embeds: [Embed1],
				ephemeral: true
			}).catch((err) => {
				console.log(err)
			});


		if (target.id === interaction.member.id)
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ Ошибка ❌").setColor("RED")
				],
				ephemeral: true
			});

		if (target.permissions.has("KICK_MEMBERS"))
			return interaction.reply({
				embeds: [new MessageEmbed().setColor("RED").setDescription("❌ Вы не являетесь администратором ❌")]
			});


		const reason = options.getString("причина");

		if (reason.length > 512)
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("❌ Не удалось запустить код с заданными строками ❌").setColor("RED")
					.setDescription("❌Причина не может содержать более 512 символов❌").setTimestamp()
				],
				ephemeral: true
			});

		const DMEmbed = new MessageEmbed()
			.setTitle(`**Вы были кикнуты с сервера**`)
			.setColor('RED')
			.setTimestamp()
			.addFields(
				{
				name: "Сервер:",
				value: `${interaction.guild.name}`,
				inline: true,
				},
				{
				name: "Причина:",
				value: reason,
				inline: true,
			},
			{
				name: "Наказание выдал:",
				value: interaction.member.user.tag,
				inline: true,
			}, 

			
			);

		await target.send({
			embeds: [DMEmbed]
		}).catch((err) => {
			console.log(err)
		});

		const Amount = options.getString("messages");

		target.kick({
			days: Amount,
			reason: reason
		})

		interaction.reply({
			embeds: [new MessageEmbed().setColor("RED").setDescription(`🔴 ${user} , пользователь **${target.user}** был кикнут с сервера 🔴`)],
		
		});

	}
}