const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

backgroundSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Background", backgroundSchema);
