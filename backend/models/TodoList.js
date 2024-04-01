const mongoose = require("mongoose");

const todoListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    completedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodoList", todoListSchema);