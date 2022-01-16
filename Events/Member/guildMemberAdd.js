const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js"); 

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        
        const { user, guild } = member;

        member.roles.add("930786853823602689");

        const Welcomer = new WebhookClient({
            id:"930787466196168725",
            token:"1h1J6QbcN0Sm-s_C_PmpkZgP2OYEEDrAU1KIVWPrVMS6k3wnnDd6sba6660sj00vdIhi"
        });

        const Welcome = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`
        ${member} посетил нас \n
        Аккаунт создан <t:${parseInt(user.createdTimestamp / 1000)}:R>\nПоследнее посещение: **${user.memberCount}**`)
        Welcomer.send({embeds: [Welcome]})
    }
}