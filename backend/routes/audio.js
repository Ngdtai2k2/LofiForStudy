const router = require("express").Router();
const audioController = require("../controllers/audioController");
const verifyMiddleware = require("../middleware/verifyToken");

const storage = require("../configs/multer");

router.get("/", audioController.getAllAudio);
router.post("/create", storage.single("file"), audioController.createAudio);
router.post("/delete/:id", audioController.deleteAudio);

module.exports = router;