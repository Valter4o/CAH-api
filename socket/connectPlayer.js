const Game = require("../models/Game");
const emitToAll = require("./helpers/emitToAll");

module.exports = async function (socket, games, { gameId, userId, username }) {
  try {
    let game = games[gameId];

    const dbGame = await Game.find({ _id: gameId }).then(([game]) => game);

    const newPlayer = {
      id: userId,
      score: 0,
      username,
      socket,
      isTsar: false,
    };

    if (!games.hasOwnProperty(gameId)) {
      games[gameId] = {
        tsarInd: 1,
        players: [newPlayer],
        chat: [],
        ...dbGame,
      };
    } else {
      game.players = game.players.filter(({ id }) => id !== userId);
      game.players.push(newPlayer);
    }

    games[gameId].chat.push({
      message: `${username} just joined the game`,
      sender: "Shefa Server",
    });

    if (games[gameId].isStarted) {
      const gameData = {
        isStarted: true,
        message: "Wait next Round",
      };
      socket.emit("reconected", { gameData });
    }

    const players = [];
    games[gameId].players.forEach(({ socket, ...rest }) => {
      players.push(rest);
    });

    emitToAll(games[gameId].players, [
      [
        "message",
        {
          chat: games[gameId].chat,
        },
      ],
      [
        "players",
        {
          players,
        },
      ],
    ]);
  } catch (err) {
    console.log(err);
  }
};
