const {MessageEmbed, Message} = require('discord.js');
const client = require('../../Structures/bot');

module.exports = {
    name: 'messageUpdate',
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    execute(oldMessage, newMessage) {
        let happen = Math.floor(new Date().getTime()/1000.0)
        if(oldMessage.author.bot) return;

        if(oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? "..." : "");
        const Edited = newMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? "..." : "");
        const LogChannel = client.channels.cache.get("928629275010170921"); // Replace with your channel id

        const Log = new MessageEmbed()
        .setColor('#36393f')
        .setDescription(` A message by ${newMessage.author} was edited in ${newMessage.channel}.`)
        .addFields({
            name: 'Original',
            value: `\n${Original}`,
            inline: false
        },{
            name: 'Edited',
            value: `\n${Edited} `.slice("0", "4096"),
            inline: false
        }, {
            name: 'Action performed',
            value: `(<t:${happen}:R>)`,
            inline: false
        })
        .setFooter(`Member ${newMessage.author.tag} | ID: ${newMessage.author.id}`)

       LogChannel.send({embeds: [Log]})
    }
}