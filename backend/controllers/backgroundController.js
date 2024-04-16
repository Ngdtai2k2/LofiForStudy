const Background = require("../models/Background");
const uploadCloudinaryController = require("./uploadCloudinaryController");
const createOptions = require("../configs/createOptions");
const mediaController = require("./mediaController");

const backgroundController = {
  create: async (req, res) => {
    try {
      const { description } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: "Please upload an image" });
      }
      const cloudinary = await uploadCloudinaryController.uploadImage(req);
      if (cloudinary === null) {
        return res.status(400).json({ message: "Image not uploaded!" });
      }
      const background = await Background.create({
        description,
        media: cloudinary._id,
      });
      return res
        .status(200)
        .json({ message: "Created successfully!", background: background });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred please try again later!" });
    }
  },
  randomBackground: async (req, res) => {
    try {
      const background = await Background.aggregate([
        { $sample: { size: 1 } },
        {
          $lookup: {
            from: "media",
            localField: "media",
            foreignField: "_id",
            as: "media",
          },
        },
        { $unwind: "$media" },
      ]);
      return res.status(200).json({ background });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred please try again later!" });
    }
  },
  getAll: async (req, res) => {
    try {
      const options = createOptions(req);
      let result = await Background.paginate({}, options);

      result.docs = await Promise.all(
        result.docs.map(async (background) => {
          return (background = await Background.populate(background, {
            path: "media",
            select: "url type",
          }));
        })
      );
      return res.status(200).json({ result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred please try again later!" });
    }
  },
  delete: async (req, res) => {
    try {
      const background = await Background.findById(req.params.id).populate({
        path: "media",
        select: "_id cloudinary_id",
      });

      if (!background) {
        return res.status(404).json({ message: "Background not found!" });
      }
      await uploadCloudinaryController.deleteFile(
        background.media.cloudinary_id
      );
      await mediaController.delete(background.media._id);
      await Background.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: "Background deleted successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred please try again later!" });
    }
  },
};

module.exports = backgroundController;
