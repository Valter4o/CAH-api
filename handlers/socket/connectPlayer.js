const Game = require("../../models/Game");

module.exports = async function (socket, games, { gameId, userId, username }) {
  try {
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
      games[gameId].players.push(newPlayer);
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
    games[gameId].players.forEach((p) => {
      p.socket.emit("message", {
        chat: games[gameId].chat,
      });

      const players = [];
      games[gameId].players.forEach(({ socket, ...rest }) => {
        players.push(rest);
      });

      p.socket.emit("players", {
        players,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
