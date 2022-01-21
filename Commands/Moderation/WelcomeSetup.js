const { MessageEmbed, GuildMember, CommandInteraction } = require("discord.js");

const DB = require("../../Memory/Schems/WelcomeSetupDB"); /* Change {CHANGEME} to whatever you name the database */

module.exports = {
  name: "welcomesetup",
  usage: "/welcomesetup [CHANNEL] [ROLE]",
  description: "Setup welcome channel",
  permissions: "ADMINISTRATOR",
  options: [
    {
      name: "welcome",
      description: "Select the welcome channel",
      required: true,
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
    },
    {
      name: "general",
      description: "Select the general channel",
      required: true,
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
    },
    {
      name: "rules",
      description: "Select the rules channel",
      required: true,
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
    },
    {
      name: "role",
      description: "Select the role to give upon joining",
      required: true,
      type: "ROLE",
    },
  ],

  /**
   *
   * @param {GuildMember} member
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { options, member, guild, user } = interaction;

    try {
      const WelcomeChannel = options.getChannel("welcome");
      const GeneralChannel = options.getChannel("general");
      const RulesChannel = options.getChannel("rules");
      const Role = options.getRole("role");

      await DB.findOneAndUpdate(
        { GuildID: guild.id },
        {
          WelcomeChannel: WelcomeChannel.id,
          GeneralChannel: GeneralChannel.id,
          RulesChannel: RulesChannel.id,
          Role: Role.id,
        },
        {
          new: true,
          upsert: true,
        }
      );

      const WelcomeSetup = new MessageEmbed()
        .setDescription(
          "Successfully setup the welcome system"
        )
        .setColor("GREEN");

      await guild.channels.cache
        .get(WelcomeChannel.id)
        .send({ embeds: [WelcomeSetup] })
        .then((m) => {
          setTimeout(() => {
            m.delete().catch(() => {});
          }, 1 * 7500);
        });

      interaction.reply({
        content: "Done",
        ephemeral: true,
      });
    } catch (err) {
      const errEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle(
          "An error occurred while setting up the welcome system"
        )
        .setDescription(`\`\`\`${err}\`\`\``);
      console.log(err);
      interaction.reply({ embeds: [errEmbed], ephemeral: true });
    }
  },
};
