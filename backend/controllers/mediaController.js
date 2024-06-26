const Media = require("../models/Media");

const mediaController = {
  create: async (req, res) => {
    try {
      const { url, type, cloudinary_id } = req;

      const newMedia = new Media({
        url: url,
        type: type,
        cloudinary_id: cloudinary_id,
      });

      const media = await newMedia.save();
      return media;
    } catch (error) {
      console.error(error);
    }
  },

  update: async (req, media) => {
    try {
      const { url, type, cloudinary_id } = req.body.media;

      const updatedMedia = await Media.findByIdAndUpdate(media, {
        url: url,
        type: type,
        cloudinary_id: cloudinary_id,
      });

      return updatedMedia;
    } catch (error) {
      console.error(error);
    }
  },

  delete: async (mediaId) => {
    try {
      await Media.findByIdAndDelete(mediaId);
      return true;
    } catch (error) {
      return false;
    }
  },
};

module.exports = mediaController;
