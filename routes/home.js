const router = require("express").Router();
const homeHandler = require("../handlers/home");

router.get("/", homeHandler);

module.exports = router;