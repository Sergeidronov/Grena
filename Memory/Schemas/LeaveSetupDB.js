const { model, Schema } = require("mongoose");

module.exports = model(
    "LeaveSetup",
    new Schema({
        GuildID: String,
        Logs: String
    }),
);