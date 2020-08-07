const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");

module.exports = {
  createToken(data) {
    return jwt.sign(data, secret, {
      expiresIn: "1d",
    });
  },
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  },
};
