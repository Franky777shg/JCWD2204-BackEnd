const router = require("express").Router();

const { authControllers } = require("../controllers");

const { verifyToken, checkRole } = require("../middleware/auth");

router.post("/login", authControllers.login);
router.post("/", authControllers.register);
router.get("/users", verifyToken, checkRole, authControllers.findAllUser);

module.exports = router;
