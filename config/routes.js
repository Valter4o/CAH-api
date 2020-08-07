const { auth,home } = require("../routes");

module.exports = (app) => {
  app.use("/auth", auth);
  app.use("/homeText",home);
};
