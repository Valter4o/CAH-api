const router = require("express").Router();
const { joinGame, getAll, post } = require("../handlers/game");

router.get("/all", getAll);
router.get("/join/:id", joinGame);
router.post("/", post);

module.exports = router;
