const emitToAll = require("./helpers/emitToAll");

module.exports = function (games, { message, sender, gameId }) {
  games[gameId].chat.push({ sender, message });
  emitToAll(games[gameId].players, [["message", { chat: games[gameId].chat }]]);
};
