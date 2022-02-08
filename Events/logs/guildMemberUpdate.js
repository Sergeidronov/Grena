// Logs whenever a member's roles have changed, their nickname changed, they started boosting, or their server avatar changed

const { MessageEmbed, GuildMember } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "guildMemberUpdate",
  /**
   * @param {GuildMember} oldMember
   * @param {GuildMember} newMember
   */
  async execute(oldMember, newMember) {
    const Data = await LogsSetupData.findOne({
      GuildID: oldMember.guild.id,
    });
    if (!Data) return;
    
    const logChannel = oldMember.guild.channels.cache.get(Data.LogsChannel); 
    const logs = await oldMember.guild.fetchAuditLogs({
      limit: 1,
    })
    const log = logs.entries.first(); // Fetches the logs and takes the last entry

    if (log.action == "MEMBER_ROLE_UPDATE") { // If the last entry fetched is of the type "MEMBER_ROLE_UPDATE" execute code
      if (oldMember.roles.cache.size == newMember.roles.cache.size) return // If number of roles member has didnt change return
      const memberRoleUpdateEmbed = new MessageEmbed()
        .setTitle("<:icons_updatemember:866943416256167936> Для участника была добавлена/удалена одна или несколько ролей")
        .setDescription(`> Следующие роли были добавлены / удалены ${oldMember} \`${log.executor.tag}\``)
        .setTimestamp()
        .setFooter(oldMember.guild.name)

      if (oldMember.roles.cache.size > newMember.roles.cache.size) { // If newMember has more roles it means roles were added
        const p = log.changes.find(x => x.key == "$remove").new.map(e => `<@&${e.id}>`).join(" ") // maps roles by their id to mention them
        memberRoleUpdateEmbed.addField("Удаленная роль(и) 📛", p).setColor("RED")
      };
      if (oldMember.roles.cache.size < newMember.roles.cache.size) { // If oldMember has more roles it means roles were removed
        const p = log.changes.find(x => x.key == "$add").new.map(e => `<@&${e.id}>`).join(" ") // maps roles by their id to mention them
        memberRoleUpdateEmbed.addField("Добавленная роль(и) ✅", p).setColor("GREEN")
      }
      await createAndDeleteWebhook(memberRoleUpdateEmbed) // executes the function bellow with as parameter the embed name

    } else if (log.action == "MEMBER_UPDATE") { // If the last entry fetched is of the type "MEMBER_UPDATE" execute code
      const memberUpdateEmbed = new MessageEmbed()
        .setColor("ORANGE")
        .setTitle("<:icons_updatemember:866943416256167936> Пользователь обновлен")
        .setTimestamp()
        .setFooter(oldMember.guild.name)

      if (oldMember.nickname !== newMember.nickname) { // If nickname changed execute code
        memberUpdateEmbed.setDescription(`> ${oldMember}'никнейм пользователя был обновлен \`${log.executor.tag}\``)
          .addFields(
            {
              name: "Старый никнейм",
              value: oldMember.nickname ? `\`${oldMember.nickname}\`` : "Раньше никакого никнейма не было"
            },
            {
              name: "Новый никнейм",
              value: newMember.nickname ? `\`${newMember.nickname}\`` : "Раньше никакого никнейма не было"
            }
          )
      }
      if (!oldMember.premiumSince && newMember.premiumSince) { // If oldMember has premiumSince and newMember does it means they started to boost
        memberUpdateEmbed.setDescription(`> ${oldMember} начал бустить этот сервер`)
      }
    }

    async function createAndDeleteWebhook(embedName) {
      await logChannel.createWebhook(oldMember.guild.name, { // Creates a webhook in the logging channel specified before
        avatar: oldMember.guild.iconURL({ format: "png" })
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
