const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      maxlenght: 50,
    },
    password: {
      type: String,
      required: true,
      minlenght: 8,
    },
    fullname: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
    },
    birthday: {
      type: Date,
    },
    about: {
      type: String,
      default: "Hello world!",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
