require("./config/database")().then(() => {
  const { port } = require("./config/config");
  const app = require("express")();
  const appString = `Server is ready, listening on port ${port}`;

  require("./config/express")(app);
  require("./config/routes")(app);

  app.listen(port, console.log(appString));
});
  
