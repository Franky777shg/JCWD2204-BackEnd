const router = require("express").Router();

const { userControllers } = require("../controllers");

router.post("/register", userControllers.register);
router.get("/all", userControllers.getAll);
router.get("/total", userControllers.totalUser);
router.get("/by", userControllers.getBy);
router.get("/city-user", userControllers.getUserInSomeCity);
router.post("/transaction", userControllers.transactionExample);
module.exports = router;
