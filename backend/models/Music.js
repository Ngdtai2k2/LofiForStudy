const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
    },
    album: {
      type: String,
    },
    type: {
      type: Number,
    },
    description: {
      type: String,
    },
    isEmbed: {
      type: Boolean,
      default: false,
    },
    embedId: {
      type: String,
    },
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Music", musicSchema);
