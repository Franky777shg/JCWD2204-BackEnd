const router = require("express").Router();

const { user } = require("../controllers");

const { generateQuery } = require("../helpers/update");

router.get("/all", user.allUser);
router.get("/search", user.searchHunchbackFilm);
router.post("/register", user.register);
router.delete("/:id", user.delete);
router.patch("/:id", generateQuery, user.update);

module.exports = router;
