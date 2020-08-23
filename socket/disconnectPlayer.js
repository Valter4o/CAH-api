const emitToAll = require("./helpers/emitToAll");

module.exports = async function (games, { username, gameId, userId }) {
  if (games[gameId]) {
    const newPlayersArr = games[gameId].players.filter(
      (player) => player.id != userId
    );
    games[gameId].players = newPlayersArr;

    if (newPlayersArr.length === 0) {
      games[gameId].chat.length = 0;
      games[gameId].isStarted = false;
    } else {
      games[gameId].chat.push({
        message: `${username} disconnected`,
        sender: "Shefa Server",
      });
      emitToAll(games[gameId].players, [
        [
          "message",
          {
            chat: games[gameId].chat,
          },
        ]
      ]);
    } 
  }
};
