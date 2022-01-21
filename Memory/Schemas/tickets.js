const { model, Schema } = require("mongoose");

module.exports = model(
    "Tickets", 
    new Schema({
    GuildID: String,
    MemberID: String,
    TicketID: String,
    channelID: String,
    Closed: Boolean,
    Locked: Boolean,
    Type: String,

})
);