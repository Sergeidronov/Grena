// Logs whenever username changed, discriminator, flags, avatar, banner

const { MessageEmbed, Client, User, UserFlags } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "userUpdate",
  /**
   * @param {User} oldUser
   * @param {User} newUser
   * @param {Client} client
   */
  async execute(oldUser, newUser, client) {
    
    
    const Data = await LogsSetupData.findOne({
      GuildID: guild.id,
    });
    if (!Data) return;
    
    const guild = client.guilds.cache.get(guild.id) // Enter your guild ID 
    const logChannel = guild.channels.cache.get(Data.LogsChannel);

    const userUpdateEmbed = new MessageEmbed()
      .setColor("ORANGE")
      .setTitle(`<:icons_updatemember:866943416256167936> Пользователь обновлен`)
      .setTimestamp()
      .setFooter(guild.name)

    if (oldUser.username !== newUser.username) { // If username changed execute code
      userUpdateEmbed.setDescription(`Пользователь ${newUser} сменил никнейм`)
        .addFields(
          {
            name: "Старый никнейм",
            value: `\`${oldUser.username}\``
          },
          {
            name: "Новый никнейм",
            value: `\`${newUser.username}\``
          }
        )

      await createAndDeleteWebhook(userUpdateEmbed) //executes the function bellow with as parameter the embed name
    }


    async function createAndDeleteWebhook(embedName) {
      await logChannel.createWebhook(guild.name, { // Creates a webhook in the logging channel specified before
        avatar: guild.iconURL({ format: "png" })
      }).then(webhook => {
        webhook.send({ // Sends the embed and transcript file through the webhook
          embeds: [embedName]
        }).then(() => webhook.delete().catch(() => { })) // Deletes the webhook and catches the error if any
      });
    }
  }
}
