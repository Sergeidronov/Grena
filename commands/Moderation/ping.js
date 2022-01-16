const { MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Отправьте сообщение на определенный канал.",
  permission: "ADMINISTRATOR",
  usage: "/say",
  options: [
    {
      name: "message",
      description: "Сообщение, которое вы хотите отправить.",
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {

    
    
    const { options } = interaction;

    const message = options.getString("мессаж") || "none";
    const user = interaction.member;


        

    const Embed1 = new MessageEmbed()
			.setTitle("❌ Недостаточно прав ❌")
			.setColor("RED")

		if (!user.permissions.has("ADMINISTRATOR"))
			return interaction.reply({
				embeds: [Embed1],
				ephemeral: true
			}).catch((err) => {
				console.log(err)
			});


    interaction.reply({embeds: 
        [new MessageEmbed()
            .setColor("AQUA")
            .setDescription(`The message was successfully  ✅`)],ephemeral: false});

            
            if (!interaction.isCommand()) return;

            if (interaction.commandName === 'ping') {
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('primary')
                            .setLabel('Primary')
                            .setStyle('PRIMARY'),
                    );
        
                await interaction.reply({ content: 'Pong!', components: [row] });

            
}
}
}
