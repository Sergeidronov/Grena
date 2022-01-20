const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: "helped",
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
                    {
                        label: 'You can select me too',
                        description: 'This is also a description',
                        value: 'second_option',
                    },
                    {
                        label: 'I am also an option',
                        description: 'This is a description as well',
                        value: 'third_option',
                    },
                ])
                );

                const embed = new Discord.MessageEmbed()
                .setTitle("Menu")
                .setColor("RED")

                
                client.on('interactionCreate', async interaction => {
                    if (!interaction.isSelectMenu()) return;
                
                    if (interaction.customId === 'select') {
                        await interaction.deferUpdate();
                        await wait(4000);
                        await interaction.editReply({ content: 'Something was selected!', components: [] });
                    }

                })
                interaction.reply({ embeds: [embed], components:[row] })
                
  },
};
