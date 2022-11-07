const { dog } = require("../controllers");
const router = require("express").Router();

router.get("/", dog.imageList);

module.exports = router;
