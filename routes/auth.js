const router = require("express").Router();
const handler = require("../handlers/auth");

router.post("/register", handler.register);
router.post("/login", handler.login);

module.exports = router;