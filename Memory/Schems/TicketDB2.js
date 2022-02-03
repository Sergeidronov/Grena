const { model, Schema } = require("mongoose");

module.exports = model(
  "Tickets2",
  new Schema({
    GuildID: String,
    MembersID: [String],
    TicketID: String,
    ChannelID: String,
    Closed: Boolean,
    Deleted: Boolean,
    Claimed: Boolean,
    ClaimedBy: String,
    OpenTime: String,
  })
);
