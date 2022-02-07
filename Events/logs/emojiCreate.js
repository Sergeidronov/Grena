const { MessageEmbed } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "emojiCreate",
  async execute(emoji) {
    const { guild } = emoji;
    if (!emoji.guild) return;

    const Data = await LogsSetupData.findOne({
      GuildID: emoji.guild.id,
    });
    if (!Data) return;

    if (emoji) {
      let emb = new MessageEmbed()
        .setDescription(`🆕 **Server emoji created!**`)
        .setFields({
          name: "Added Emoji",
          value: `${emoji} :${emoji.name}:`,
          inline: true,
        })
        .setColor("#43b581")
        .setFooter({ text: `Emoji ID: ${emoji.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [emb] })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
