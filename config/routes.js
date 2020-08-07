const { auth, home, blackCard, whiteCard } = require("../routes");

module.exports = (app) => {
  app.use("/auth", auth);
  app.use("/homeText", home);
  app.use("/blackCard", blackCard);
  app.use("/whiteCard", whiteCard);
};
