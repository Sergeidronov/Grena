const mongoose = require('mongoose');

const altlogSchema = mongoose.Schema({
    Guild: String,
    Channel: String
})

module.exports = mongoose.model("altlogs", altlogSchema)