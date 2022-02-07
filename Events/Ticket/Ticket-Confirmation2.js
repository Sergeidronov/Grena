const {
  ButtonInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require('discord.js');
const DB = require('../../Memory/Schems/TicketDB2');
const TicketSetupData = require('../../Memory/Schems/TicketSetupDB2');
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: 'interactionCreate',
  /**
   * 
   * @param {ButtonInteraction} interaction 
   */
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const { guild, member, customId, message, channel } = interaction;

    if (!["rip1", "rp1"].includes(customId)) return;
    
    


    DB.findOne({ ChannelID: channel.id }, async (err, data) => {
      if (err) throw err;
      if (!data) return interaction.reply("Нет данных в базе")
      }

    )
  }
  }
