const router = require("express").Router();
const audioController = require("../controllers/audioController");
const verifyMiddleware = require("../middleware/verifyToken");

const storage = require("../configs/multer");

router.get("/", audioController.getAll);
router.post("/create", verifyMiddleware.tokenAndAdminAuth, storage.single("file"), audioController.create);
router.post("/delete/:id", verifyMiddleware.tokenAndAdminAuth, audioController.delete);

module.exports = router;