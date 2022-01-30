const { CommandInteraction, MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "poll",
    description: "Создание голосования",
    usage: "/poll",
    permission: "ADMINISTRATOR",
    options: [
      {
          name: "poll",
          description: "Опишите опрос, который вы хотите провести.",
          type: "STRING",
          required: true
      }, 
      {
        name: "channel",
        description: "Выберите канал для отправки сообщения.",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
      },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        
        const { options } = interaction;

        const poll = options.getString("poll");
        const gChannel = options.getChannel("channel") || interaction.channel;

        const pollEmbed = new MessageEmbed()
            .setColor("AQUA")
            .setTitle("Poll 📊")
            .setDescription(poll)
            .setFooter("Нажмите на эмодзи 👍, 👎, для описания вашего мнения.")
            .setTimestamp()

        const sendMessage = await client.channels.cache.get(gChannel.id).send({embeds: [pollEmbed]});
        sendMessage.react("👍")
        sendMessage.react("👎")

        interaction.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`Голосование успешно создано ${gChannel} ✅`)],ephemeral: true})
    }
}