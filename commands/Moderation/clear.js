const { CommandInteraction, MessageEmbed } = require(`discord.js`);

module.exports = {
    name: "clear",
    description:"Удаляет указанное количество сообщений из канала или целевого объекта",
	permission: "ADMINISTRATOR",
    options: [
        {
            name: "amount",
            description: "Выберите количество сообщений для удаления из канала или целевого объекта",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Выберите цель, чтобы очистить их сообщения",
            type: "USER",
            require: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options } = interaction;
        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");
        const per = this.permission
        const reason2 = "Invalid Permissions"
        const Messages = await channel.messages.fetch();
        const user = interaction.member
		const name = interaction.commandName



        const Embed1 = new MessageEmbed()

        .setTitle("❌ Недостаточно прав ❌")
			.setColor("RED")

            if (!user.permissions.has("ADMINISTRATOR"))
			return interaction.reply({
				embeds: [Embed1],
				ephemeral: true
			}).catch((err) => {
				console.log(err)
			});

        const Response = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK");

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
            if(m.author.id === Target.id && Amount > i)  {
                   filtered.push(m);
                   i++;
            }
            })

        await channel.bulkDelete(filtered, true).then(messages => {
            Response.setDescription(`✅ Удалено ${messages.size} сообщений в этом канале${Target}.`);
            interaction.reply({embeds:[Response]});

        })

       } else {
           await channel.bulkDelete(Amount,true).then(messages => {
            Response.setDescription(`✅ Удалено ${messages.size} сообщений в этом канале.`);
            interaction.reply({embeds:[Response]});

           })
       }
    }
}

