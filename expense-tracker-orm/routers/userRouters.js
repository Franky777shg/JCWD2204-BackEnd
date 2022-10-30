const router = require("express").Router();

const { user } = require("../controllers");

router.post("/register", user.register);
router.post("/login", user.login);
router.post("/profile/:id", user.updateProfile);

module.exports = router;
