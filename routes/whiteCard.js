const router = require("express").Router();
const { get, post } = require("../handlers/whiteCard");

router.get("/", get);
router.post("/", post);

module.exports = router;
