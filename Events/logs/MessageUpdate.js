const { MessageEmbed, Message } = require("discord.js");
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
  name: "messageUpdate",
  /**
   * 
   * @param {Message} oldMessage 
   * @param {Message} newMessage 
   */

  async execute(oldMessage, newMessage) {

    const { guild } = oldMessage;
    const Data = await LogsSetupData.findOne({
        GuildID: oldMessage.guild.id,  
  
      });

    if (!oldMessage.guild) return;

    if(oldMessage.author.bot) return;

    if(oldMessage.content === newMessage.content) return;
    if (!Data) return;

    

    const Count = 1950;
    const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "");
    const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? " ..." : "");

    
    

    if (oldMessage) {
      let emb = new MessageEmbed()
      .setTitle('Сообщение изменено')
      .addFields(
            { name: 'Отправитель', value: `${newMessage.author.tag}`, inline: true },
            { name: 'Канал', value: `${newMessage.channel}`, inline: true },
            { name: 'До изменения', value: `${Original}`, inline: false },
            { name: 'После изменения', value: `${Edited}`, inline: false },
      )
        .setColor("YELLOW")
        .setFooter({ text: `ID: ${newMessage.author.id}` })
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
