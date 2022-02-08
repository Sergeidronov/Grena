// Logs whenever a user or a bot joins the guild

const { MessageEmbed, GuildMember } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {GuildMember} member 
   */
  async execute(member) {
    const Data = await LogsSetupData.findOne({
      GuildID: member.guild.id,
    });
    if (!Data) return;
    
    const logChannel = member.guild.channels.cache.get(Data.LogsChannel); 
    const logs = await member.guild.fetchAuditLogs({
      limit: 1,
    })
    const log = logs.entries.first(); // Fetches the logs and takes the last entry

    if (log.action == "BOT_ADD") { // If the last entry fetched is of the type "BOT_ADD" it means a bot has joined
      const botJoinedEmbed = new MessageEmbed()
        .setTitle("<:icons_unbanmember:866943415321100289> Бот присоединился к серверу")
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(member.guild.name)
        .setDescription(`> Бот ${member} был добавлен \`${log.executor.tag}\` на этот сервер`)

      await createAndDeleteWebhook(botJoinedEmbed) // executes the function bellow with as parameter the embed name
    } else { // Else it means a normal user joined
      const userJoinedEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("<:icons_unbanmember:866943415321100289> Пользователь только что присоединился к серверу")
        .setTimestamp()
        .setFooter(member.guild.name)
        .setDescription(`> Пользователь ${member} только что присоединился`)

      await createAndDeleteWebhook(userJoinedEmbed) // executes the function bellow with as parameter the embed name
    }

    async function createAndDeleteWebhook(embedName) {
      await logChannel.createWebhook(member.guild.name, { // Creates a webhook in the logging channel specified before
        avatar: member.guild.iconURL({ format: "png" })
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
