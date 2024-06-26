const uploadCloudinaryController = require("./uploadCloudinaryController");
const mediaController = require("./mediaController");
const Audio = require("../models/Audio");
const createOptions = require("../configs/createOptions");

const audioController = {
  create: async (req, res) => {
    try {
      const { title, artist, profileUrl, description, urlYoutube } = req.body;
      const isEmbed = urlYoutube ? 1 : 0;
      let data;

      if (req.file) {
        if (req.file.mimetype.startsWith("audio/")) {
          data = await uploadCloudinaryController.uploadAudio(req, res);
        } else {
          return res.status(400).json({ message: "Invalid file type" });
        }
      }

      const newAudio = await Audio.create({
        title: title,
        artist: artist || null,
        profileUrl: profileUrl || null,
        description: description || null,
        isEmbed: urlYoutube ? 1 : 0,
        urlYoutube: isEmbed ? urlYoutube || null : null,
        media: !isEmbed ? (data ? data._id : null) : null,
      });

      const audio = await newAudio.save();

      return res
        .status(201)
        .json({ message: "Audio saved successfully!", audio: audio });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred please try again later!" });
    }
  },

  getAll: async (req, res) => {
    try {
      const options = createOptions(req);
      let result = await Audio.paginate({}, options);
      result.docs = await Promise.all(
        result.docs.map(async (audio) => {
          return (audio = await Audio.populate(audio, {
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
      const audio = await Audio.findById(req.params.id).populate({
        path: "media",
        select: "_id cloudinary_id",
      });

      if (!audio) {
        return res.status(404).json({ message: "Audio not found!" });
      }
      if (!audio.isEmbed) {
        await uploadCloudinaryController.deleteFile(
          audio.media.cloudinary_id,
          "video"
        );
        await mediaController.delete(audio.media._id);
      }
      await Audio.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Audio deleted successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred please try again later!" });
    }
  },

  getAllData: async (req, res) => {
    try {
      const options = createOptions(req);
      let audios = await Audio.paginate({}, options);
      audios.docs = await Promise.all(
        audios.docs.map(async (audio) => {
          return (audio = await Audio.populate(audio, {
            path: "media",
            select: "url type",
          }));
        })
      );
      return res.status(200).json({ audios });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred please try again later!" });
    }
  },
};

module.exports = audioController;
