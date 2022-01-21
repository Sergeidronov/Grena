const { model, Schema } = require("mongoose");

module.exports = model ("SuggestDBS",   new Schema({
        GuildID: String,
        MessageID: String,
        Details: Array
    }))