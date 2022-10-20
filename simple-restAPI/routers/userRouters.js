const router = require("express").Router();

const { userControllers } = require("../controllers");

const { generateID } = require("../helper/generateID");

router.post("/register", generateID, userControllers.register);
router.get("/all", userControllers.getAllUser);
router.get("/expense", userControllers.getExpense);
router.get("/:id", userControllers.getUserById);
router.delete("/:id", userControllers.deleteUserById);
router.patch("/:id", userControllers.editById);
router.post("/write", userControllers.writeExpense);
module.exports = router;
