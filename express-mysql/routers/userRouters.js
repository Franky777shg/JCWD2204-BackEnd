const router = require("express").Router();

const { user } = require("../controllers");

router.get("/all", user.allUser);

module.exports = router;
