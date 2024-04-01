const mongoose = require("mongoose");

const backgroundSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Background", backgroundSchema);
