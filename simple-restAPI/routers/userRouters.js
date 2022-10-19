const router = require("express").Router();

const { userControllers } = require("../controllers");

router.post("/register", userControllers.register);

module.exports = router;
