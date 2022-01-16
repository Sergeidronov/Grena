const { MessageEmbed, Message, WebhookClient } = require("discord.js"); 

module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Message} oldMessage
     * @param {Message} newMessage
     */
    execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return;

        if(oldMessage.content === newMessage.content) return;
        
        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? "..." : "");
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? "..." : "");

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📘 Сообщение от ${newMessage.author} было **обновлено**.\n
        **Оригинальное**:\n ${Original} \n**Измененное**:\n ${Edited}`)
        .setFooter(`ID: ${newMessage.author.id}`)
        .setTimestamp()
        new WebhookClient({url: "https://discord.com/api/webhooks/931398196041744446/jqRPeZ5ZVBU6lQtOdHuu0Ky5vXzzRSpIlXJvQoHOIjqkEXPCPPQsGPdO2wFgGenL2Foq" })
        .send({embeds: [Log]}).catch((err) => console.log(err))
    } 
}