const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  currency: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  isInprogress: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
