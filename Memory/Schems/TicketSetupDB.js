const { model, Schema } = require("mongoose");

module.exports = model("Ticket-Setup", new Schema({
    GuildID: String,
    Channel: String,
    Category: String,
    Transcripts : String,
    Handlers: String,
    Everyone: String,
}))