const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js"); 

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {       
        const { user, guild } = member;

        const Loger = new WebhookClient({
            id:"930787466196168725",
            token:"1h1J6QbcN0Sm-s_C_PmpkZgP2OYEEDrAU1KIVWPrVMS6k3wnnDd6sba6660sj00vdIhi"
        });

        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setAuthor(user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} покинул нас\n
        Присоединился: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nпоследнее количество участников: **${guild.memberCount}**`)
        .setFooter(`ID: ${user.id}`)
        Loger.send({embeds: [Welcome]})
    }
}