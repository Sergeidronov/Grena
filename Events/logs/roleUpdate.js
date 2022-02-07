const { MessageEmbed, GuildMember } = require('discord.js');
const LogsSetupData = require("../../Memory/Schems/LogsSetupDB");

module.exports = {
    name: 'guildMemberUpdate',
    /**
     * 
     * @param {GuildMember} oldMember 
     * @param {GuildMember} newMember 
     * @returns 
     */
    async execute(oldMember, newMember) {

      const { guild } = oldMember;
      const Data = await LogsSetupData.findOne({
          GuildID: oldMember.guild.id,  
    
        });
  
      if (!oldMember.guild) return;
  
  
  
      if (!Data) return;



        if(oldMember.nickname !== newMember.nickname) {
            const emb = new MessageEmbed()
            .setTitle('Пользователь обновлен')
            .setDescription(`${newMember} никнейм был обновлен`)
            .setFields(
                {
                    name: 'Старый никнейм',
                    value: `\`\`\`${oldMember.nickname ? oldMember.nickname : "None"}\`\`\``,
                    inline: false
                }, {
                    name: 'Новый никнейм',
                    value: `\`\`\`${newMember.nickname ? newMember.nickname : "None"}\`\`\``,
                    inline: false
                },
            )
            .setColor('AQUA')
            
            await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [emb] })
        .catch((error) => {
          console.log(error);
        });
        }
        if(oldMember.user.username !== newMember.user.username) {
            const emb = new MessageEmbed()
            .setTitle('Пользователь обновлен')
            .setFields(
                {
                    name: 'Старый никнейм',
                    value: `\`\`\`${oldMember.user.username}\`\`\``,
                    inline: false
                }, {
                    name: 'Новый никнейм',
                    value: `\`\`\`${newMember.user.username}\`\`\``,
                     inline: false
                } ,
            )
            .setColor('AQUA')

            await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [emb] })
        .catch((error) => {
          console.log(error);
        });
        }
        if(oldMember.roles.cache.size !== newMember.roles.cache.size) {
            let difference

            if(oldMember.roles.cache.size > newMember.roles.cache.size) {
                difference = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id));

                const emb = new MessageEmbed()
                .setTitle('Роль добавлена')
                .setDescription(`${newMember.user.tag} добавлены роли`)
                .addFields(
                    {
                        name: 'Роли',
                        value: `${difference.map(r => r).join(" ")}`,
                        inline: false
                    },
                )
                .setColor('GREEN')

                await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [emb] })
        .catch((error) => {
          console.log(error);
        });
            } else {
                difference = newMember.roles.cache.filter(r =>!oldMember.roles.cache.has(r.id));

                const emb = new MessageEmbed()
                .setTitle('Роль убрана')
                .setDescription(`${newMember.user.tag} роли убраны`)
                .setFields(
                    {
                        name: 'Роли',
                        value: `${difference.map(r => r).join(" ")}`,
                        inline: false
                    } , 
                )
                .setColor('GREEN')

                await guild.channels.cache
        .get(Data.LogsChannel)
        .send({ embeds: [emb] })
        .catch((error) => {
          console.log(error);
        });
            }
        }
    }
}