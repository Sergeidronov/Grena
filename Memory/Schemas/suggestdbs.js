const { model, Schema } = require("mongoose");

module.exports = model("suggestdbs", new Schema({
  GuildID: String,
  MessageID: String,
  Details: Array
}));