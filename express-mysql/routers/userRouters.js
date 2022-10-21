const router = require("express").Router();

const { user } = require("../controllers");

router.get("/test", user.test);

module.exports = router;
