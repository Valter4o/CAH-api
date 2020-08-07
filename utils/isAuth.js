const User = require("../models/User");
const jwt = require("../utils/jwt");
const { cookie } = require("../config/config");

module.exports = (justGo = false) => {
  return function (req, res, next) {
    const token = req.cookies[cookie] || "";
    jwt
      .verifyToken(token)
      .then(({ _id: id }) => {
        User.findById(id).then((user) => {
          req.user = user;
          next();
        });
      })
      .catch((err) => {
        if (justGo) {
          next();
          return;
        }
        res.redirect("/user/login");
      });
  };
};
