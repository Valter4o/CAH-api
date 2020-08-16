const router = require("express").Router();
const { getAll, post,deleteGame } = require("../handlers/game");

router.get("/all", getAll);
router.post("/", post);
router.post("/delete", deleteGame);

module.exports = router;
