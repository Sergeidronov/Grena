const { CommandInteraction, MessageEmbed } = require('discord.js');
const Schema = require('../../Memory/Schems/altlogs');

module.exports = {
name: 'alt logs',
description: 'set alt logs',
permission: 'MANAGE_GUILD',
     /**
     * 
     * @param {CommandInteraction} interaction 
     */
options: [
    {
            name: 'altlogs',
            description: 'configure anti alt logs',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'channel',
                    description: 'selct a channel for alt logs to be sent it',
                    type: 'CHANNEL',
                    channelTypes: ["GUILD_TEXT"],
                    required: true
                }
            
    ],

    async execute(interaction) {
        const { options, member, guild, user} = interaction;
        const altLogs = options.getChannel('channel');
        
        Schema.findOne({Guild: guild.id}, async(err, data) => {
                    if(err) throw err;
                    if(data) data.delete();
                    new Schema({
                        Guild: guild.id,
                        Channel: altLogs.id,
                    }).save();
                    interaction.reply({content: `Successfully set alts logs to ${altLogs}`, ephemeral: true})
                }
                )
    }
    }
]}
