const { MessageEmbed } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "emojiDelete",
  async execute(emoji) {
    const { guild } = emoji;
    if (!emoji.guild) return;

    const Data = await LogsSetupData.findOne({
      GuildID: emoji.guild.id,
    });
    if (!Data) return;

    if (emoji) {
      let emb = new MessageEmbed()
        .setDescription(`🗑 **Server emoji deleted!**`)
        .setFields({
          name: "Deleted Emoji",
          value: `[:${emoji.name}:](https://cdn.discordapp.com/emojis/${emoji.id}.webp)`,
          inline: true,
        })
        .setColor("#f04947")
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
