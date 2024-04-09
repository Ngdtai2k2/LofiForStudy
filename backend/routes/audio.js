const router = require("express").Router();
const audioController = require("../controllers/audioController");
const verifyMiddleware = require("../middleware/verifyToken");

const storage = require("../configs/multer");

router.get("/", audioController.getAll);
router.post("/create", storage.single("file"), audioController.create);
router.post("/delete/:id", audioController.delete);

module.exports = router;