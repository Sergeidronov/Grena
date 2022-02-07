const { MessageEmbed, GuildChannel } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "channelDelete",
  /**
   *
   * @param {GuildChannel} channel
   */
  async execute(channel) {
    const { guild } = channel;
    if (!channel.guild) return;
    if (channel.type === "GUILD_NEWS_THREAD") return;
    if (channel.type === "GUILD_PUBLIC_THREAD") return;
    if (channel.type === "GUILD_PRIVATE_THREAD ") return;

    const Data = await LogsSetupData.findOne({
      GuildID: channel.guild.id,
    });
    if (!Data) return;

    if (channel.type === "GUILD_TEXT") {
      let emb = new MessageEmbed()
        .setDescription(`🗑 **Text channel deleted: #${channel.name}**`)
        .setFields({
          name: "Name",
          value: `${channel.name}`,
          inline: true,
        })
        .setColor("#f04947")
        .setFooter({ text: `Channel ID: ${channel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [emb] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (channel.type === "GUILD_VOICE") {
      let emb = new MessageEmbed()
        .setDescription(`🗑 **Voice channel deleted: #${channel.name}**`)
        .setFields({
          name: "Name",
          value: `${channel.name}`,
          inline: true,
        })
        .setColor("#f04947")
        .setFooter({ text: `Channel ID: ${channel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [emb] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (channel.type === "GUILD_STAGE_VOICE") {
      let emb = new MessageEmbed()
        .setDescription(`🗑 **Stage channel deleted: #${channel.name}**`)
        .setFields({
          name: "Name",
          value: `${channel.name}`,
          inline: true,
        })
        .setColor("#f04947")
        .setFooter({ text: `Channel ID: ${channel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [emb] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (channel.type === "GUILD_NEWS") {
      let emb = new MessageEmbed()
        .setDescription(`🗑 **Announcements channel deleted: #${channel.name}**`)
        .setFields({
          name: "Name",
          value: `${channel.name}`,
          inline: true,
        })
        .setColor("#f04947")
        .setFooter({ text: `Channel ID: ${channel.id}` })
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
