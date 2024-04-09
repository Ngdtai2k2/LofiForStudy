const mongoose = require("mongoose");

const backgroundSchema = new mongoose.Schema(
  {
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
