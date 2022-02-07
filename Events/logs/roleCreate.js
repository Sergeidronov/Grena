const { MessageEmbed } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "roleCreate",
  async execute(role, client) {
    const { guild } = role;
    if (!role.guild) return;

    const Data = await LogsSetupData.findOne({
      GuildID: role.guild.id,
    });
    if (!Data) return;

    if (role) {
      let emb = new MessageEmbed()
        .setDescription(`⚔ **Role created: ${role.name}**`)
        .setFields(
          {
            name: "Color",
            value: `[${
              role.hexColor
            }](https://colorpicker.me/#${role.color.toString(16)})`,
            inline: true,
          },
          {
            name: "Hoisted",
            value: `${role.hoist}`,
            inline: true,
          },
          {
            name: "Position",
            value: `${role.position}`,
            inline: true,
          },
          {
            name: "Permissions",
            value: `${role.permissions
              .toArray()
              .join(", ")
              .toLowerCase()
              .replaceAll("_", " ")}`,
            inline: true,
          }
        )
        .setColor("#43b581")
        .setFooter({ text: `Role ID: ${role.id}` })
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
