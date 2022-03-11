const   { Client, Intents, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js'),
        client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });
        client.db = require("quick.db");

module.exports = {
            name: "poll",
            description: "Создание голосования",
            permission: "ADMINISTRATOR",
            options: [
                {
                    name: "time",
                    description: "Время голосования в минутах",
                    type: "INTEGER",
                    required: true
                }, {
                    name: "question",
                    description: "Вопрос",
                    type: "STRING",
                    required: true
                }, {
                    name: "answer1",
                    description: "Ответ 1",
                    type: "STRING",
                    required: true
                }, {
                    name: "answer2",
                    description: "Ответ 2",
                    type: "STRING",
                    required: true
                }, {
                    name: "answer3",
                    description: "Ответ 3",
                    type: "STRING"
                }, {
                    name: "answer4",
                    description: "Ответ 4",
                    type: "STRING"
                }, {
                    name: "answer5",
                    description: "Ответ 5",
                    type: "STRING"
                }
            ],
            
     /**
     * @param {interactionCreate} interaction
     */
      async execute(interaction) {

        
      
}

}
