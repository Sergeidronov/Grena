const { MessageEmbed } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "emojiUpdate",
  async execute(oldEmoji, newEmoji) {
    const { guild } = oldEmoji;
    if (!oldEmoji.guild) return;

    const Data = await LogsSetupData.findOne({
      GuildID: oldEmoji.guild.id,
    });
    if (!Data) return;

    if (oldEmoji.name !== newEmoji.name) {
      let emb = new MessageEmbed()
        .setDescription(`📝 **Server emoji updated!**`)
        .setFields({
          name: "Renamed Emoji",
          value: `${oldEmoji} :${oldEmoji.name}: -> :${newEmoji.name}:`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Emoji ID: ${oldEmoji.id}` })
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
