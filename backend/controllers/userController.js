const User = require("../models/User");
const mongoose = require("mongoose");

const uploadCloudinaryController = require("./uploadCloudinaryController");
const mediaController = require("./mediaController");
const createOptions = require("./../configs/createOptions");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const options = createOptions(req, "-password");
      const users = await User.paginate({}, options);

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred please try again later!" });
    }
  },

  changeRole: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      // req.body.id is the id of the person making the API call
      if (user._id.toString() === req.body.id) {
        return res.status(400).json({ message: "You can't change your own role!" });
      }
      if (user.isAdmin) {
        user.isAdmin = false;
      } else {
        user.isAdmin = true;
      }
      await user.save();
      return res.status(200).json({ message: "Change user role successfully!" });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred please try again later!" });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      return res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred please try again later!" });
    }
  },

  findUserById: async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: "User not found!" });
      }
      const user = await User.findById(req.params.id)
        .select("-password -isAdmin")
        .populate("media");
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred please try again later!" });
    }
  },

  updateUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("media");

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      if (req.body.email && req.body.email !== user.email) {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json({ message: "Email already exists!" });
        }
      }

      if (req.file) {
        const media = user?.media;
        if (media) {
          if (
            !(await mediaController.delete(req, res, media._id)) ||
            !(await uploadCloudinaryController.deleteFile(media.cloudinary_id))
          ) {
            return res
              .status(400)
              .json({ message: "An error occurred, please try again later!" });
          }
        }

        const data = await uploadCloudinaryController.uploadImage(req, res);
        if (data === null) {
          return res.status(400).json({ message: "Image not uploaded!" });
        }

        user.media = data._id;
      }

      const userUpdate = await User.findByIdAndUpdate(
        req.params.id,
        req.file ? { $set: { ...req.body, media: user.media } } : req.body,
        { new: true }
      ).select("-password -isAdmin").populate("media");

      return res
        .status(200)
        .json({ user: userUpdate, message: "Successful update profile!" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong!" });
    }
  },
};

module.exports = userController;
