const getRandomCards = require("../helpers/getRandomCards");

module.exports = async (games, { gameId }) => {
  games[gameId].isStarted = true;

  const question = await getRandomCards(1, "black");
  const playersCount = games[gameId].players.length - 1;
  let whiteCardsForAll = await getRandomCards(playersCount * 10, "white");
  const tsarInd = games[gameId].tsarInd;
  let tsar;

  games[gameId].players.forEach((p, i) => {
    if (i === tsarInd) {
      p.status = "TSAR";
      tsar=p.username;
    } else {
      p.status = "Selecting...";
      p.topRow = whiteCardsForAll.slice(0, 5);
      p.bottomRow = whiteCardsForAll.slice(5, 10);
      whiteCardsForAll = whiteCardsForAll.slice(10);
    }
  });

  games[gameId].players.forEach(({ socket: s, topRow, bottomRow }) => {
    const players = [];
    games[gameId].players.forEach(({ socket, ...rest }) => {
      players.push(rest);
    });

    s.emit("players", {
      players,
    });

    s.emit("gameStart", {
      topRow,
      bottomRow,
      question,
      tsar
    });
  });
};
