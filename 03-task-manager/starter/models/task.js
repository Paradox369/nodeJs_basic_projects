const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "give me something, come on!"],
    trim: true,
    maxLength: [20, "name over 20 characters long, come on!"],
  },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
