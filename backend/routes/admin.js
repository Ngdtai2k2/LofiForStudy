const router = require("express").Router();
const dashboardController = require("../controllers/dashboardController");
const verifyMiddleware = require("../middleware/verifyToken");

router.get('/users/count', verifyMiddleware.tokenAndAdminAuth, dashboardController.countUsers);

module.exports = router;
