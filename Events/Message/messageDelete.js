const { MessageEmbed, Message, WebhookClient } = require("discord.js"); 

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message
     */
    execute(message) {
        if(message.author.bot) return;
        
        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setFooter(`ID: ${message.author.id} `)
        .setTimestamp()
        .setDescription(`📘 Сообщение от ${message.author} было **удалено**.\n
        **Удаленное сообщение:**\n ${message.content ? message.content : "None"}`.slice(0, 4096))
        if(message.attachments.size >= 1){
            Log.addField(`Attachemts:`, `${message.attachments.map(a => a.url)}`, true)
        }
        
        new WebhookClient({url: "https://discord.com/api/webhooks/931398196041744446/jqRPeZ5ZVBU6lQtOdHuu0Ky5vXzzRSpIlXJvQoHOIjqkEXPCPPQsGPdO2wFgGenL2Foq" }
        ).send({embeds: [Log]}).catch((err) => console.log(err)) 
    } 
}