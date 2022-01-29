const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "test",
    description: "Shows the bot's status",


    async execute(interaction) {
        if (!interaction.isCommand()) return;

	if (interaction.commandName === 'test') {
		const row = new MessageActionRow()
			.addComponents(
				// ...
			);

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org/')
			.setDescription('Some description here');

		await interaction.reply({ content: 'Pong!', ephemeral: true, embeds: [embed], components: [row] });
	}
}
   }