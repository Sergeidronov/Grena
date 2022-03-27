const { CommandInteraction, MessageEmbed } = require("discord.js");

/**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

module.exports = {
  name: "vc",
  description: "Configure your voice room.",
  options: [
    {
      name: "configure",
      description: "Configure your voice room.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "name",
          description: "Change your voice room's name.",
          type: "STRING",
        },
        {
          name: "limit",
          description: "Change the user limit of your voice room.",
          type: "NUMBER",
        },
      ]
    },
    {
      name: "add",
      description: "Whitelist a user to your voice room.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "Select the user.",
          type: "USER",
          required: true
        }
      ]
    },
    {
      name: "remove",
      description: "Blacklist a user from your voice room.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "Select the user.",
          type: "USER",
          required: true
        }
      ]
    },
    {
      name: "public",
      description: "Set your voice room as public.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "turn",
          description: "Turn on or off.",
          type: "STRING",
          required: true,
          choices: [
            { name: "on", value: "on" },
            { name: "off", value: "off"}
          ]
        }
      ]
    },
    {
      name: "hide",
      description: "Hide or unhide your voice room from everyone. (Unhidden by default)",
      type: "SUB_COMMAND",
      options: [
        {
          name: "switch",
          description: "Switch on (hide) or off (unhide).",
          type: "STRING",
          required: true,
          choices: [
            { name: "on", value: "on" },
            { name: "off", value: "off"}
          ]
        }
      ]
    },
  ],

  async execute(interaction, client) {
    const {options, member, guild} = interaction;

    const subCommand = options.getSubcommand();
    const voiceChannel = member.voice.channel;
    const ownedChannel = client.voiceGenerator.get(member.id);

    const vcName = options.getString("name")
    const vcLimit = options.getNumber("limit")
    
    const errorEmbed = new MessageEmbed()
    .setColor("RED")
    .setAuthor({name: `Voice Room | ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true, size: 512})}`})
    //.setFooter({text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})

    const successEmbed = new MessageEmbed()
    .setColor("GREEN")
    .setAuthor({name: `Voice Room | ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true, size: 512})}`})
    //.setFooter({text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 512})}`})

    if(!voiceChannel)
      return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772> You're not in a voice channel.")], ephemeral: true})

    if(!ownedChannel || voiceChannel.id !== ownedChannel)
      return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772> You do not own this voice room.")], ephemeral: true});

    switch(subCommand) {
      case "configure" : {
        if(vcName) {
          const newName = options.getString("name")
          if(newName.length > 22 || newName.length < 1)
            return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772> Name cannot be longer than 22 characters or shorter than 1 character.")], ephemeral: true})
          voiceChannel.edit({ name: newName});
          interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> You changed your voice room's name to \`${newName}\``)], ephemeral: true})
        }
        if(vcLimit) {
          const newLimit = options.getNumber("limit")
          if(newLimit.length > 99 || newLimit.length < 1)
            return interaction.reply({embeds: [errorEmbed.setDescription("<a:error:806489368977866772> User limit cannot be greater than 99 or less than 1.")], ephemeral: true})
          
          voiceChannel.edit({ userLimit: newLimit});
          interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> You changed your voice room's user limit to \`${newLimit}\``)], ephemeral: true})
        }
      }
      break;
      case "add" : {
        const targetMember = options.getMember("user");
        voiceChannel.permissionOverwrites.edit(targetMember, {CONNECT: true, VIEW_CHANNEL: true});

        const channel = interaction.guild.channels.cache.get(`797748561693376518`)

        await channel.send({content: `${targetMember}, ${member} has invited you to their voice room: <#${voiceChannel.id}>`}).then((m) => {
          setTimeout(() => {
            m.delete().catch(() => {});
          }, 5 * 1000);
        })

        /*await targetMember.send({content: `${member} has invited you to <#${voiceChannel.id}>`}).then((m) => {
          setTimeout(() => {
            m.delete().catch(() => {});
          }, 10 * 1000);
        })*/
        interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> ${targetMember} has been whitelisted.`)], ephemeral: true})
      }
      break;
      case "remove" : {
        const targetMember = options.getMember("user");
        voiceChannel.permissionOverwrites.delete(targetMember);

        if(targetMember.voice.channel && targetMember.voice.channel.id == voiceChannel.id) targetMember.voice.setChannel(null);
        interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> ${targetMember} has been blacklisted.`)], ephemeral: true})
      }
      break;
      case "public" : {
        const turnChoice = options.getString("turn");
        switch(turnChoice) {
          case "on" : {
            voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: null});
            interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Your voice room has been set to **Public**.`)], ephemeral: true})
          }
          break;
          case "off" : {
            voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: false});
            interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Your voice room has been set to **Private**.`)], ephemeral: true})
          }
          break;
        }
      }
      break;
      case "hide" : {
        const turnChoice = options.getString("switch");
        switch(turnChoice) {
          case "on" : {
            voiceChannel.permissionOverwrites.edit(guild.id, {VIEW_CHANNEL: false});
            interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Your voice room is now **hidden** from everyone.`)], ephemeral: true})
          }
          break;
          case "off" : {
            voiceChannel.permissionOverwrites.edit(guild.id, {VIEW_CHANNEL: true});
            interaction.reply({embeds: [successEmbed.setDescription(`<a:verify:806489601748631554> Your voice room is now **visible** to everyone.`)], ephemeral: true})
          }
        }
      }
    }
  }
}