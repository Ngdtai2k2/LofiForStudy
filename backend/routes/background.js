const backgroundController = require("../controllers/backgroundController");
const verifyMiddleware = require("../middleware/verifyToken");
const storage = require("../configs/multer");

const router = require("express").Router();

router.post(
  "/create",
  verifyMiddleware.tokenAndAdminAuth,
  storage.single("file"),
  backgroundController.create
);
router.get("/random", backgroundController.randomBackground);
router.get("/", verifyMiddleware.tokenAndAdminAuth, backgroundController.getAll);
router.delete("/delete/:id", verifyMiddleware.tokenAndAdminAuth, backgroundController.delete)

module.exports = router;
