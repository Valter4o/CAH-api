module.exports = (games, { cardId, gameId }) => {
  games[gameId].tsarInd++;

  const winner = games[gameId].selectedCards.find((c) => c.id === cardId)
    .username;
  games[gameId].selectedCards.length = 0;

  games[gameId].players.forEach((p) => {
    if (p.username === winner) {
      p.socket.emit("tsarSelected", {
        message: "The Tsar selected your card congrats",
      });
      p.score++;
    } else {
      p.socket.emit("tsarSelected", {
        message: `The Tsar selected ${winner}'s card`,
      });
    }
    setTimeout(() => {
      startGameBinded({ gameId });
    }, 3000);
  });
};
