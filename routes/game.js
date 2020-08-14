const router = require("express").Router();
const { getAll, post } = require("../handlers/game");

router.get("/all", getAll);
router.post("/", post);

module.exports = router;
