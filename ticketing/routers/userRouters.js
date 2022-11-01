const router = require("express").Router();

const { user } = require("../controllers");

router.post("/register", user.register);
router.post("/login", user.login);
router.post("/buy", user.buyTicket);
router.get("/events", user.viewAllEvent);
router.get("/event-available", user.viewAvailableEvent);

module.exports = router;
