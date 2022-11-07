const { product } = require("../controllers");

const router = require("express").Router();

router.get("/", product.findAll);
router.post("/", product.create);

module.exports = router;
