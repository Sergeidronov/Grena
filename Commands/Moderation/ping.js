const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "test",
  alias: [],
  description: "Отправьте сообщение на определенный канал.",

  async execute(interaction, client) {
    
    const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.setMaxValues(1)
					.addOptions([{
                        label: 'Select me',
                        description: 'This is a description',
                        value: 'first_option',
                    },
                ])
                );

                const embed = new Discord.MessageEmbed()
                .setTitle("Menu")
                .setColor("RED")


                const m = await interaction.reply({ embeds: [embed], components:[row] })

                const ifilter = i => i.user.id === message.author.id;
                
                const collector = m.createMessageComponentCollector({ filter: ifilter, time: 60000 })

                collector.on("collect", async i => {
                    if(i.values[0] === "first_option"){
                        await i.deferUpdate()
                        i.editReply({content: "Grec!", components: [] })
                    }
                })
  },
};
