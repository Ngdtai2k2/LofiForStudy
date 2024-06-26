const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const AudioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    isEmbed: {
      type: Boolean,
      default: false,
    },
    urlYoutube: {
      type: String,
    },
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  },
  { timestamps: true }
);

AudioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Audio", AudioSchema);
