const mongoose = require("mongoose")

module.exports = mongoose.model("todo", new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, required: true },
    task: { type: String, required: true },
    desc: { type: String, required: true },
    priority: { type: String, required: true },
}))