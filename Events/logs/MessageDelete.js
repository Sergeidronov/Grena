const { MessageEmbed, Message } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "messageDelete",
  /**
   * 
   * @param {Message} message
   */

  async execute(message) {

    const { guild } = message;
    const Data = await LogsSetupData.findOne({
        GuildID: message.guild.id,  
  
      });

    if (!message.guild) return;

    if(message.author.bot) return;
    if (!Data) return;

    if (message) {
      let emb = new MessageEmbed()
      .setTitle('Сообщение удалено')
      .addFields(
            { name: 'Отправитель', value: `${message.author.tag}`, inline: true },
            { name: 'Канал', value: `${message.channel}`, inline: true },
            { name: 'Содержимое', value: `${message.content ? message.content : "None"}`, inline: false },
      )
        .setColor("RED")
        .setFooter({ text: `ID: ${message.author.id}` })
        .setTimestamp();


        if(message.attachments.size >= 1) {
            emb.addField(`Вложения:`, `${message.attachments.map(a => a.url)}`, true)
        }

      await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [emb] })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
