// Logs whenever a user is unbanned from the guild

const { Client, GuildBan, MessageEmbed } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "guildBanRemove",
  /**
   * @param {GuildBan} ban
   */
  async execute(ban, client) {
    const Data = await LogsSetupData.findOne({
      GuildID: ban.guild.id,
    });
    if (!Data) return;
    
    const logChannel = ban.guild.channels.cache.get(Data.LogsChannel);
    const logs = await ban.guild.fetchAuditLogs({
      type: "MEMBER_BAN_REMOVE",
      limit: 1,
    })
    const log = logs.entries.first(); // Fetches the logs and takes the last entry of the type "MEMBER_BAN_REMOVE"

    if (log) { // If there is a corresponding entry creates the embed
      const memberBannedLogEmbed = new MessageEmbed()
        .setTitle("<:icons_unbanmember:866943415321100289> Пользователь разбанен")
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(ban.guild.name)
        .setDescription(`> Пользователь \`${log.target.tag}\` разбанен \`${log.executor.tag}\``);

      return await createAndDeleteWebhook(memberBannedLogEmbed) // executes the function bellow with as parameter the embed name
    } else { // Else if nothing can be found in the audit logs executes code
      const memberBannedEmbed = new MessageEmbed()
        .setTitle("<:icons_unbanmember:866943415321100289> Пользователь разбанен")
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(ban.guild.name)
        .setDescription(`> Пользователь \`${ban.user.tag}\` был разбанен`);

      return await createAndDeleteWebhook(memberBannedEmbed) // executes the function bellow with as parameter the embed name
    }

    async function createAndDeleteWebhook(embedName) {
      await logChannel.createWebhook(ban.guild.name, { // Creates a webhook in the logging channel specified before
        avatar: ban.guild.iconURL({ format: "png" })
      }).then(webhook => {
        webhook.send({ // Sends the embed through the webhook
          embeds: [embedName]
        }).then(() => webhook.delete().catch(() => { })) // Deletes the webhook and catches the error if any
      });
    }
  },
};


// Code created by 刀ტ乃ტのၦ#0001 on discord
// Licence: MIT
