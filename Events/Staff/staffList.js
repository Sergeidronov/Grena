const { Client, MessageEmbed } = require('discord.js')

const Staff = [
    "Owner",
    "Co-Owner",
    "Development™",
    "Support",
]

const Config = {
    GuildID: "",
    StaffChannelID: "",
    StaffMessageID: ""
}

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {

        if (!Config.GuildID) return
        if (!Config.StaffChannelID) return
        if (!Config.StaffMessageID) return

        setInterval(async function () {
            let msg = await client.channels.cache.get(Config.StaffChannelID).messages.fetch(Config.StaffMessageID)
            const List = new MessageEmbed()
            .setColor('#F5C50E')
            .setTitle('Staff List')
            .setThumbnail("https://cdn.discordapp.com/attachments/934812573134622811/935592335364993194/Logo-1.png")
            .setTimestamp()
            .setImage("https://cdn.discordapp.com/attachments/934812573134622811/935590552320221314/StaffList-1.png")
            Staff.forEach((staff) => {
                List.addFields({ name: `${staff}:`, value: `${client.guilds.cache.get(Config.GuildID).roles.cache.find(r => r.name == staff).members.map(m => `${m.user}, `).join("") || "⠀"}`, inline: false })
            })
            msg.edit({ embeds: [List], content: " " })
    
        }, 1 * 1000)

    }
}