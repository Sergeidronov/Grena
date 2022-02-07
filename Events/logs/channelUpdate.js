const { MessageEmbed, GuildChannel } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "channelUpdate",
  /**
   *
   * @param {GuildChannel} oldChannel
   * @param {GuildChannel} newChannel
   */
  async execute(oldChannel, newChannel, client) {
    const { guild } = oldChannel;
    if (!oldChannel.guild) return;
    if (oldChannel.type === "GUILD_NEWS_THREAD") return;
    if (oldChannel.type === "GUILD_PUBLIC_THREAD") return;
    if (oldChannel.type === "GUILD_PRIVATE_THREAD ") return;

    const Data = await LogsSetupData.findOne({
      GuildID: oldChannel.guild.id,
    });
    if (!Data) return;

    if (
      oldChannel.type === "GUILD_TEXT" &&
      oldChannel.name !== newChannel.name
    ) {
      const embed = new MessageEmbed()
        .setDescription(`📝 **Text channel updated: ${oldChannel.name}**`)
        .setFields({
          name: "Renamed",
          value: `${oldChannel.name} -> ${newChannel.name}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_VOICE" &&
      oldChannel.name !== newChannel.name
    ) {
      const embed = new MessageEmbed()
        .setDescription(`📝 **Voice channel updated: ${oldChannel.name}**`)
        .setFields({
          name: "Renamed",
          value: `${oldChannel.name} -> ${newChannel.name}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_STAGE_VOICE" &&
      oldChannel.name !== newChannel.name
    ) {
      const embed = new MessageEmbed()
        .setDescription(`📝 **Stage channel updated: ${oldChannel.name}**`)
        .setFields({
          name: "Renamed",
          value: `${oldChannel.name} -> ${newChannel.name}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_NEWS" &&
      oldChannel.name !== newChannel.name
    ) {
      const embed = new MessageEmbed()
        .setDescription(
          `📝 **Announcements channel updated: ${oldChannel.name}**`
        )
        .setFields({
          name: "Renamed",
          value: `${oldChannel.name} -> ${newChannel.name}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_TEXT" &&
      oldChannel.type !== newChannel.type
    ) {
      let embed = new MessageEmbed()
        .setDescription(`📝 **Text channel updated: ${oldChannel.name}**`)
        .setFields({
          name: "Type",
          value: `${oldChannel.type} -> ${newChannel.type}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_VOICE" &&
      oldChannel.type !== newChannel.type
    ) {
      let embed = new MessageEmbed()
        .setDescription(`📝 **Voice channel updated: ${oldChannel.name}**`)
        .setFields({
          name: "Type",
          value: `${oldChannel.type} -> ${newChannel.type}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_STAGE_VOICE" &&
      oldChannel.type !== newChannel.type
    ) {
      let embed = new MessageEmbed()
        .setDescription(`📝 **Stage channel updated: ${oldChannel.name}**`)
        .setFields({
          name: "Type",
          value: `${oldChannel.type} -> ${newChannel.type}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_NEWS" &&
      oldChannel.type !== newChannel.type
    ) {
      let embed = new MessageEmbed()
        .setDescription(
          `📝 **Announcements channel updated: ${oldChannel.name}**`
        )
        .setFields({
          name: "Type",
          value: `${oldChannel.type} -> ${newChannel.type}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_TEXT" &&
      oldChannel.nsfw !== newChannel.nsfw
    ) {
      let embed = new MessageEmbed()
        .setDescription(`📝 **Text channel updated: ${oldChannel.name}**`)
        .setFields({
          name: "NSFW",
          value: `${oldChannel.nsfw} -> ${newChannel.nsfw}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_NEWS" &&
      oldChannel.nsfw !== newChannel.nsfw
    ) {
      let embed = new MessageEmbed()
        .setDescription(
          `📝 **Announcements channel updated: ${oldChannel.name}**`
        )
        .setFields({
          name: "NSFW",
          value: `${oldChannel.nsfw} -> ${newChannel.nsfw}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_VOICE" &&
      oldChannel.bitrate !== newChannel.bitrate
    ) {
      let embed = new MessageEmbed()
        .setDescription(`📝 **Voice channel updated: ${oldChannel.name}**`)
        .setFields({
          name: "Bitrate",
          value: `${oldChannel.bitrate}kbps -> ${newChannel.bitrate}kbps`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_STAGE_VOICE" &&
      oldChannel.bitrate !== newChannel.bitrate
    ) {
      let embed = new MessageEmbed()
        .setDescription(`📝 **Stage channel updated: ${oldChannel.name}**`)
        .setFields({
          name: "Bitrate",
          value: `${oldChannel.bitrate}kbps -> ${newChannel.bitrate}kbps`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_VOICE" &&
      oldChannel.userLimit !== newChannel.userLimit
    ) {
      let embed = new MessageEmbed()
        .setDescription(`📝 **Voice channel updated: ${oldChannel.name}**`)
        .setFields({
          name: "User Limit",
          value: `${oldChannel.userLimit} -> ${newChannel.userLimit}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();
      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      oldChannel.type === "GUILD_TEXT" &&
      oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser
    ) {
      let embed = new MessageEmbed()
        .setDescription(`📝 **Text channel updated: ${oldChannel.name}**`)
        .setFields({
          name: "Slowmode",
          value: `${
            oldChannel.rateLimitPerUser ? oldChannel.rateLimitPerUser : "Off"
          } -> ${newChannel.rateLimitPerUser || "Off"}`,
          inline: true,
        })
        .setColor("#faa41b")
        .setFooter({ text: `Channel ID: ${oldChannel.id}` })
        .setTimestamp();

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [embed] })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
