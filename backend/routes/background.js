const backgroundController = require("../controllers/backgroundController");
const storage = require("../configs/multer");

const router = require("express").Router();

router.post("/create", storage.single("file"), backgroundController.create);
router.get("/random", backgroundController.randomBackground);
router.get("/", backgroundController.getAll);

module.exports = router;
