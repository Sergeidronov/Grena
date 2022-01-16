const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "say",
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
    {
      name: "channel",
      description: "Выберите канал для отправки вставки.",
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    
    const { options } = interaction;

    const message = options.getString("message") || "none";
    const gChannel = options.getChannel("channel") || interaction.channel;
    const user = interaction.member

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

    if (message === "none") {interaction.reply({embeds: [new MessageEmbed().setColor("RED").setTitle("Error ❌").setDescription("Please set a message to be sent!")]})};  //Checking message exists just incase the a field is somehow passed through/
    const sendMessage = await client.channels.cache.get(gChannel.id).send(message);

    interaction.reply({embeds: [new MessageEmbed().setColor("AQUA").setDescription(`The message was successfully sent to ${gChannel} ✅`)],ephemeral: true});
  },
};
