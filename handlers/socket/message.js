module.exports = function (games, { message, sender, gameId }) {
  games[gameId].chat.push({ sender, message });
  Object.values(games[gameId].players).forEach(({ socket: s, isTsar }) => {
    //Todo:Tsar doesnt receive chat when picking card
    s.emit("message", { chat: games[gameId].chat });
  });
};
