const router = require("express").Router();
const audioController = require("../controllers/audioController");
const verifyMiddleware = require("../middleware/verifyToken");

const storage = require("../configs/multer");

router.get("/", audioController.getAll);
router.get("/all-audio", verifyMiddleware.tokenAndAdminAuth, audioController.getAllData);
router.post("/create", verifyMiddleware.tokenAndAdminAuth, storage.single("file"), audioController.create);
router.delete("/delete/:id", verifyMiddleware.tokenAndAdminAuth, audioController.delete);

module.exports = router;