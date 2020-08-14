const getRandomCards = require("../helpers/getRandomCards");

module.exports = async (games, { gameId }) => {
  games[gameId].isStarted = true;

  const question = await getRandomCards(1, "black");
  const playersCount = games[gameId].players.length;
  let whiteCardsForAll = await getRandomCards(playersCount * 10, "white");

  games[gameId].players.forEach((p) => {
    p.topRow = whiteCardsForAll.slice(0, 5);
    p.bottomRow = whiteCardsForAll.slice(5, 10);
    whiteCardsForAll = whiteCardsForAll.slice(10);
  });
  games[gameId].players.forEach(({ socket: s, topRow, bottomRow }) => {
    s.emit("gameStart", {
      topRow,
      bottomRow,
      question,
      topRow,
      bottomRow,
    });
  });
};
