// Logs whenever an invite is deleted

const { MessageEmbed, Invite } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "inviteDelete",
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
      type: "INVITE_DELETE"
    })
    const log = logs.entries.first(); // Fetches the logs and takes the last entry

    const inviteDeleteEmbed = new MessageEmbed()
      .setTitle("<:icons_linkrevoke:865572289022394368> Приглашение было удалено на сервере")
      .setColor("RED")
      .setTimestamp()
      .setFooter(invite.guild.name)


    if (log) { // If entry is existing executes code
      inviteDeleteEmbed.setDescription(`Приглашение \`${invite.code}\` было удалено \`${log.executor.tag}\``)
        .addField("Канал", `<#${invite.channelId}>`)

      await createAndDeleteWebhook(inviteDeleteEmbed) // executes the function bellow with as parameter the embed name
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
