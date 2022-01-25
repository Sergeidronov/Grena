const {
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
  } = require("discord.js");
  
  
  module.exports = {
    name: "btnroles",
    description: "Reaction roles but buttons instead",
    permission: "ADMINISTRATOR",
    usage: "/buttonroles [role1] [role2] [role3] [role4] [embed message]",
    options: [
      {
        name: "role1",
        description: "Set the first role",
        type: "ROLE",
        required: true,
      },
      {
        name: "role2",
        description: "Set the second role",
        type: "ROLE",
        required: false,
      },
      {
        name: "role3",
        description: "Set third role",
        type: "ROLE",
        required: false,
      },
      {
        name: "role4",
        description: "Set fourth role",
        type: "ROLE",
        required: false,
      },
      {
        name: "embedmessage",
        description: "Sets the embed message",
        type: "STRING",
        required: false,
      },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {arguments} arguments
     */
  
    async execute(interaction, guild, client) {
      const { options } = interaction;
      const role1 = options.getRole("role1");
      const role2 = options.getRole("role2");
      const role3 = options.getRole("role3");
      const role4 = options.getRole("role4");
      const embdmsg = options.getString("embedmessage");
  
      const row = new MessageActionRow();
  
      row.addComponents(
        new MessageButton()
          .setLabel(`${role1.name}`)
          .setStyle("SECONDARY")
          .setCustomId(`${role1.id}`)
      );
  
      if (role2) {
        row.addComponents(
          new MessageButton()
            .setLabel(`${role2.name}`)
            .setStyle("SECONDARY")
            .setCustomId(`${role2.id}`)
        );
      }
  
      if (role3) {
        row.addComponents(
          new MessageButton()
            .setLabel(`${role3.name}`)
            .setStyle("SECONDARY")
            .setCustomId(`${role3.id}`)
        );
      }
  
      if (role4) {
        row.addComponents(
          new MessageButton()
            .setLabel(`${role4.name}`)
            .setStyle("SECONDARY")
            .setCustomId(`${role4.id}`)
        );
      }
  
      const errembd = new MessageEmbed().setColor('RED').setDescription("⛔ You cannot add roles that are higher than yours.")
  
  
      const errbot = new MessageEmbed().setColor('RED').setDescription("⛔ This role is superior than the bot's role, bot's role should be higher than the role that is given.")
      
      const Response = new MessageEmbed()
        .setColor('AQUA');
      if(embdmsg) await Response.setDescription(`${embdmsg}`)
      if(embdmsg == null) await Response.setDescription("Click on buttons to get or remove roles.")
  
      const success = new MessageEmbed().setColor("GREEN").setDescription("Buttons created successfully!")
      
  
      if(role1.position > interaction.member.roles.highest.position) {
      return interaction.reply({embeds: [errembd], ephemeral: true });
      } else if(role1.position > interaction.guild.me.roles.highest.position) return interaction.reply({embeds: [errbot], ephemeral: true });
  
      if (role2) {
      if(role2.position > interaction.member.roles.highest.position) {
      return interaction.reply({embeds: [errembd], ephemeral: true });
      } else if(role2.position > interaction.guild.me.roles.highest.position) return interaction.reply({embeds: [errbot], ephemeral: true });
      }
      
      if (role3) {
      if(role3.position > interaction.member.roles.highest.position) {
      return interaction.reply({embeds: [errembd], ephemeral: true });
      } else if(role3.position > interaction.guild.me.roles.highest.position) return interaction.reply({embeds: [errbot], ephemeral: true });
      }
  
      if (role4) {
      if(role4.position > interaction.member.roles.highest.position) {
      return interaction.reply({embeds: [errembd], ephemeral: true });
      } else if(role4.position > interaction.guild.me.roles.highest.position) return interaction.reply({embeds: [errbot], ephemeral: true });
      }
        interaction.channel.send({embeds: [Response], components: [row] });
  interaction.reply({embeds: [success], ephemeral: true})
  
     },
  };
  