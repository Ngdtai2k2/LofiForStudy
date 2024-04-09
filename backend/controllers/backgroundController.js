const Background = require("../models/Background");
const uploadCloudinaryController = require("./uploadCloudinaryController");
const createOptions = require("../configs/createOptions");

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
      return res.status(500).json({ error: error.message });
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
      return res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const options = createOptions(req);
      let result = await Background.paginate({}, options);

      result.docs = await Promise.all(
        result.docs.map(async (background) => {
          return (background = await Background.populate(background, 
            { path: "media", select: "url type" },
          ));
        })
      );
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = backgroundController;
