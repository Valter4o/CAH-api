const Game = require("../models/Game");

module.exports = {
  getAll: (req, res) => {
    Game.find()
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  post: async (req, res) => {
    const { name, private, password, creator } = req.body;

    try {
      const newGame = await new Game({
        name,
        private,
        password,
        creator,
        minPlayers: 3,
        maxPlayers: 10,
        inProgress: false,
        players: [],
      });

      if (newGame) {
        newGame.save().then(() => {
          res.status(300).json({
            message: "Game created succesfully!",
          });
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  },
  deleteGame: async (req, res) => {
    const { id } = req.body;
    await Game.deleteOne({ _id: id });
    res.status(200).send();
  },
};
