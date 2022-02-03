const { model, Schema } = require("mongoose");

module.exports = model("Ticket-Setup2", new Schema({
    GuildID: String,
    Channel: String,
    Category: String,
    Transcripts : String,
    Handlers: String,
    Everyone: String,
    Description: String,
    Message: String,
}))