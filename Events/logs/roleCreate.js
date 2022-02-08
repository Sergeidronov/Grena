// Logs whenever a role is created

const { MessageEmbed, Role, Permissions, Client } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "roleCreate",
  /**
   * @param {Role} role
   */
  async execute(role, client) {
    const Data = await LogsSetupData.findOne({
      GuildID: role.guild.id,
    });
    if (!Data) return;
    
    const logChannel = role.guild.channels.cache.get(Data.LogsChannel); 
    const logs = await role.guild.fetchAuditLogs({
      limit: 1,
      type: "ROLE_CREATE"
    })
    const log = logs.entries.first(); // Fetches the logs and takes the last entry

    const roleCreateEmbed = new MessageEmbed()
      .setTitle("<:icons_createrole:866943415774478388> Роль создана")
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(role.guild.name)


    if (log) { // If entry first entry is existing executes code
      roleCreateEmbed.setDescription(`> Роль \`${role.name}\` создана \`${log.executor.tag}\``)
        .addFields(
          {
            name: "Цвет",
            value: `\`${role.color}\``,
            inline: true
          },
          {
            name: "Поднятый",
            value: role.hoist ? "\`Yes\`" : "\`No\`",
            inline: true
          },
          {
            name: "Заслуживающий упоминания",
            value: role.mentionable ? "\`Yes\`" : "\`No\`",
            inline: true
          },
          {
            name: "Позиция",
            value: `\`${role.position - 1}\``,
            inline: true
          }
        )

      if (role.permissions.bitfield !== "0") { // If bitfield of allowed permissions is different than 0 (null) maps all the allowed permissions
        const p = new Permissions(role.permissions.bitfield).toArray().slice(" ").map(e => `\`${e}\``).join(" ").toLowerCase().replaceAll("_", " ");

        roleCreateEmbed.addField("Права", p)
      }

      await createAndDeleteWebhook(roleCreateEmbed) // executes the function bellow with as parameter the embed name
    }


    async function createAndDeleteWebhook(embedName) {
      await logChannel.createWebhook(role.guild.name, { // Creates a webhook in the logging channel specified before
        avatar: role.guild.iconURL({ format: "png" })
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
