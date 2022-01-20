const { client, CommandInteraction, MessageEmbed } = require('discord.js')


module.exports = {
    name: "interactionCreate",
     /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {

            if(interaction.isButton()) {
      const ButtonInteraction = interaction;  
      const chck = ButtonInteraction.member.roles.cache.get(`${ButtonInteraction.customId}`);
      const rle = ButtonInteraction.customId;
      const rolecheck = interaction.guild.roles.cache.get(`${rle}`)
              
      if (rolecheck) {
      const errbot = new MessageEmbed().setColor('RED').setDescription("⛔ This role is superior than the bot's role, bot's role should be higher than the role that is given.")
              
      if (!ButtonInteraction.member.guild.roles.cache.get(`${ButtonInteraction.customId}`)) return ButtonInteraction.reply({content: `The role is invalid`, ephemeral: true}); // If role is deleted

      if (rolecheck.position > ButtonInteraction.guild.me.roles.highest.position) return ButtonInteraction.reply({embeds: [errbot], ephemeral: true });
      
      if (!chck) {
        ButtonInteraction.member.roles.add(`${rle}`);
        ButtonInteraction.reply({
          content: `The role was successfully given to you!`,
          ephemeral: true,
          
        });
      } else if (chck) {
              
ButtonInteraction.member.roles.remove(`${rle}`);
       ButtonInteraction.reply({
          content: `I successfully took your role!`,
          ephemeral: true,
              });
            }
          }
        }
    }
}