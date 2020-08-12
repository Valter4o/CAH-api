const Game = require("../models/Game");

module.exports = {
  joinGame: async (req, res) => {
    const { id } = req.params;
    const { userId, username } = req.query;

    const game = await Game.find({ _id: id }).then(([game]) => game);

    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    };

    const newPlayer = {
      id: userId,
      username,
      res,
    };

    const newPlayersArr = game.players.concat(newPlayer);
    await Game.updateOne(
      {
        _id: game._id,
      },
      {
        players: newPlayersArr,
      }
    );
    game.update();

    res.writeHead(200, headers);
    const data = `data: ${JSON.stringify(game)}\n\n`;
    res.write(data);

    console.log(game);
    
    req.on("close", async () => {
      const newPlayersArr = game.players.filter(
        (player) => player.id != userId
      );
      await Game.updateOne(
        {
          _id: game._id,
        },
        {
          players: newPlayersArr,
        }
      );
      console.log(`${username} Connection closed`);
    });
  },
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
};
