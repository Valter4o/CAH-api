const { auth, home, blackCard, whiteCard,game } = require("../routes");
const cool = require("cool-ascii-faces");

module.exports = (app) => {
  app.use("/auth", auth);
  app.use("/homeText", home);
  app.use("/blackCard", blackCard);
  app.use("/whiteCard", whiteCard);
  app.use("/game", game);
  app.use("/cool", (req, res) => res.send(cool()));
};
