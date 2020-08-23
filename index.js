const connectPlayer = require("./socket/connectPlayer");
const disconnectPlayer = require("./socket/disconnectPlayer");
const message = require("./socket/message");
const startGame = require("./socket/startGame");
const selectCard = require("./socket/selectCard");
const tsarSelected = require("./socket/tsarSelected");

require("./config/database")()
  .then(() => {
    const { port } = require("./config/config");
    const app = require("express")();
    const http = require("http");
    const socketIo = require("socket.io");
    const appString = `Server is ready, listening on port ${port}`;

    const server = http.createServer(app);
    const io = socketIo(server);
    io.origins("*:*");

    let games = {};

    io.on("connection", (socket) => {
      const connectPlayerBinded = connectPlayer.bind(undefined, socket, games);
      const messageBinded = message.bind(undefined, games);
      const disconnectPlayerBinded = disconnectPlayer.bind(undefined, games);
      const startGameBinded = startGame.bind(undefined, games);
      const selectCardBinded = selectCard.bind(undefined, games);
      const tsarSelectedBinded = tsarSelected.bind(undefined, games);

      socket.on("connectPlayer", connectPlayerBinded);
      socket.on("disconnectPlayer", disconnectPlayerBinded);
      socket.on("message", messageBinded);
      socket.on("startGame", startGameBinded);
      socket.on("selectCard", selectCardBinded);
      socket.on("tsarSelected", tsarSelectedBinded);
    });

    require("./config/express")(app);
    require("./config/routes")(app);
    server.listen(port, () => console.log(appString));
  })
  .catch((err) => console.log(err));
