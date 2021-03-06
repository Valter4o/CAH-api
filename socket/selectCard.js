const getRandomCards = require("../handlers/helpers/getRandomCards");
const emitToAll = require("./helpers/emitToAll");

module.exports = (games, { card, gameId, userId, row, username }) => {
  let selectedCards = games[gameId].selectedCards;
  selectedCards
    ? selectedCards.push({ username, ...card })
    : (selectedCards = [{ username, ...card }]);
  games[gameId].selectedCards = selectedCards;

  if (selectedCards.length === games[gameId].players.length - 1) {
    games[gameId].players.forEach(({ socket: s }) => {
      s.emit("tsarSelecting", { selectedCards });
    });
  }

  const player = games[gameId].players.find((p) => p.id === userId);
  player.status = "Ready";

  player[`${row}Row`] = player[`${row}Row`].filter(
    ({ id, text }) => id !== card.id && card.text !== text
  );

  const newCard = getRandomCards(1, "white")[0];
  player[`${row}Row`].push(newCard);

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
};
