const router = require("express").Router();
const todoListController = require("../controllers/todoListController");
const verifyMiddleware = require("../middleware/verifyToken");

router.get('/:id', verifyMiddleware.verifyTokenAndUserAuthorization, todoListController.getByUser);
router.post('/change-status/:id/:todo_id', verifyMiddleware.verifyTokenAndUserAuthorization, todoListController.changeStatus);
router.post('/create/:id', verifyMiddleware.verifyTokenAndUserAuthorization, todoListController.create);
router.delete('/delete/:id/:todo_id', verifyMiddleware.verifyTokenAndUserAuthorization, todoListController.delete);

module.exports = router;