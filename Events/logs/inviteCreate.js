// Logs whenever an invite is created
// ❗ ms package needed `npm i ms` ❗

const { MessageEmbed, Invite } = require("discord.js");
const ms = require("ms");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "inviteCreate",
  /**
   * @param {Invite} invite 
   */
  async execute(invite) {
    const Data = await LogsSetupData.findOne({
      GuildID: invite.guild.id,
    });
    if (!Data) return;
    
    const logChannel = invite.guild.channels.cache.get(Data.LogsChannel);
    const logs = await invite.guild.fetchAuditLogs({
      limit: 1,
      type: "INVITE_CREATE"
    })
    const log = logs.entries.first(); // Fetches the logs and takes the last entry

    const inviteCreateEmbed = new MessageEmbed()
      .setTitle("<:icons_linkadd:865572290065072128> Приглашение было создано на сервере")
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(invite.guild.name)


    if (log) { // If entry is existing executes code
      inviteCreateEmbed.setDescription(`Приглашение \`${invite.code}\` было создано \`${log.executor.tag}\``)
        .addFields(
          {
            name: "Канал",
            value: `<#${invite.channelId}>`
          },
          {
            name: "Истекает",
            value: invite.maxAge != 0 ? `<t:${parseInt(invite.expiresTimestamp / 1000)}:R>` : "Никогда не истекает"
          },
          {
            name: "Максимальный возраст",
            value: invite.maxAge != 0 ? `\`${ms(invite.maxAge * 1000)}\`` : "Нет лимита"
          },
          {
            name: "Максимальное использование",
            value: invite.maxUses != 0 ? `\`${invite.maxUses}\`` : "Нет максимального использования"
          }
        )

      if (invite.temporary) inviteCreateEmbed.addField("Временный", `\`Да\``) // If temporary membership add field

      await createAndDeleteWebhook(inviteCreateEmbed) // executes the function bellow with as parameter the embed name
    }


    async function createAndDeleteWebhook(embedName) {
      await logChannel.createWebhook(invite.guild.name, { // Creates a webhook in the logging channel specified before
        avatar: invite.guild.iconURL({ format: "png" })
      }).then(webhook => {
        webhook.send({ // Sends the embed through the webhook
          embeds: [embedName]
        }).then(() => webhook.delete().catch(() => { })) // Deletes the webhook and catches the error if any
      });
    }
  }
}


// Code created by 刀ტ乃ტのၦ#0001 on discord
// Licence: MIT
