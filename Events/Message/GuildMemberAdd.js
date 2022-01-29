 const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
 const { WebhookToken1, WebhookID1 } = require("../../Structures/config.json");
const ms = require('ms');
const timeSpan = ms('3 days'); 
const DB = require('../../Memory/Schems/altlogs'); 

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    async execute(member) {    
        const createdAt = new Date(member.user.createdAt).getTime();
        const difference = Date.now() - createdAt;
        const reason = "Alt Account"
        const dm = new MessageEmbed()

        const { user, guild } = member;
    
         Welcome = new WebhookClient({
         id: WebhookID1,
         token: WebhookToken1
        });

        const WelcomeEmbed = new MessageEmbed()
         .setColor("RED")
         .setAuthor(user.tag, user.displayAvatarURL({dynamic: true, size:256}))
         .setThumbnail(user.displayAvatarURL({dynamic: true, size:256}))
         .setDescription(`
         Welcome ${member} to the **${guild.name}**!\n
         Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n Latest Member Count: **${guild.memberCount}**`)
         .setFooter(`ID: ${user.id}`)

        Welcome.send({embeds: [WelcomeEmbed]});
        
          const data = await DB.findOne({Guild: guild.id})
          if(!data) return;

          const channel = member.guild.channels.cache.get(data.Channel);

          const embed = new MessageEmbed()
          .setTitle('<:warn:936307176799084574> Alt Account Detected')
          .setDescription(`${member} /s account age is smaller than the one allowed which is 3 days`)
          .setFields({
            name: 'Account age',
            value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`,
            inline: false
          })
          .setColor('RED')
          .setFooter({text: 'This action was performed automatically from me'})
          .setTimestamp()
        
        const dm = new MessageEmbed()
        
          
        .setTitle(`Kicked From ${member.guild.name}!`)
        .setColor("RED")
        .setDescription(`Accounts Less Than A Three Day's Old Aren't Allowed in ${member.guild.name}`)
        .setFields(
            {
                name: "Reason", value: reason,
            },
            {
                name: "Created", value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`
            }
        )
        if(difference < timeSpan) {
            await member.send({embeds: [dm]})
            await member.kick(reason)
            await channel.send({embeds: [embed]})  
        
        
        
         }
     }
 }