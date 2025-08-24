const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" }
});

module.exports = mongoose.model("Task", TaskSchema);
