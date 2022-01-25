const { MessageEmbed, Message } = require('discord.js');
const client = require('../../Structures/index');

module.exports = {
    name: 'messageDelete',
    /**
     * 
     * @param {Message} message 
     */
    execute(message) {
        if(message.author.bot) return;
        let happen = Math.floor(new Date().getTime()/1000.0)
        const LogChannel = client.channels.cache.get('928629275010170921'); // Replace with your channel id

        const Log = new MessageEmbed()
        .setColor('#36393f')
        .setDescription(`A Message by ${message.author.tag} was deleted`)
        .addFields({
            name: 'Content',
            value: `${message.content ? message.content : "None"}`.slice(0, 4096),
            inline: false
        }, {
            name: 'Action performed',
            value: `(<t:${happen}:R>)`,
            inline: false
        })

        if(message.attachments.size >= 1) {
            Log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        }

        LogChannel.send({embeds: [Log]})

    }
}