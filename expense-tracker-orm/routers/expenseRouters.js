const router = require("express").Router();

const { expense } = require("../controllers");

router.post("/add", expense.add);
router.patch("/edit/:id", expense.edit);
router.delete("/delete/:id", expense.delete);

module.exports = router;
