/////// Protocole http pourl'ensemble de l'application ////////////////////////////////////////
const http = require("http");

////// Serveur créé pour app.js ///////////////////////////////////////////////
const app = require("./app");

/////// normalizePort s'assure que les ports utilisés seront déclarés sous forme de number //////
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

/////// Choix du port 3000 si aucun n'est choisi par les variables d'environnement /////////////
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

////// Constuction des erreurs serveurs à renvoyer si la connexion ne marche pas ///////////////
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

////// Création du serveur en utilisant app.js /////////////////////////////////////////////////
const server = http.createServer(app);

////// Mise en place de adresse serveur ////////////////////////////////////////////////////////
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

////// Serveur utilisera le port 3000 par défaut ///////////////////////////////////////////////
server.listen(process.env.PORT || 3000);
