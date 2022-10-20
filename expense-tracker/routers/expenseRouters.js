const router = require("express").Router();

const { expense } = require("../controllers");

router.get("/all", expense.allExpense);
router.get("/:id", expense.getById);
router.post("/create", expense.createExpense);
router.delete("/:id", expense.deleteById);
router.patch("/:id", expense.editById);
router.post("/total", expense.totalByCate);

module.exports = router;
