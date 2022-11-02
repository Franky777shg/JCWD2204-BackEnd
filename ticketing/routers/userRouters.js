const router = require("express").Router();

const { user } = require("../controllers");

const { multerUpload } = require("../helpers/multer");

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/keepLogin", user.keepLogin);
router.post("/buy", user.buyTicket);
router.get("/events", user.viewAllEvent);
router.get("/event-available", user.viewAvailableEvent);
router.post(
  "/single-uploaded/:id",
  multerUpload.single("file"),
  user.uploadFile
);

module.exports = router;
