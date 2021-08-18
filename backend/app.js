/////// Utilisation du framework express qui facilite le routing et autres fonctionnalités de Node.js /////////////////
const express = require("express");
const app = express();

////// Utilisation du middleware helmet qui implémente des contôles de sécurité dans le framework Express ////
const helmet = require("helmet");

/////// Dotenv permet d'invisiliser des données sensibles du script via les variables d'enronnement //////////
const dotenv = require("dotenv");
dotenv.config();

/////// Outil de modélisation des données Mongoose ///////////////////////////////////////////////////////////
const mongoose = require("mongoose");

/////// Module path permet aux images de trouver le bon chemin vers l'affichage //////////////////////////////
const path = require("path");

/////// Module cors empêche les erreurs CORS par défaut //////////////////////////////////////////////////////
const cors = require("cors");

/////// Appel des routes user et sauce ///////////////////////////////////////////////////////////////////////
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

/////// Connection à mongoose en remplaçant les identifiants par les variables d'environment /////////////////
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.korbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée "));

app.use(helmet());

////// Les en-tête  qu'on attend en retour des requêtes ////////////////////////////////////////////////////////
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors());

app.use(express.json());

/////// Chemin statique nécessaire à l'affichage des images /////////////////////////////////////////////////////
app.use("/images", express.static(path.join(__dirname, "images")));

/////// Utilisation des routes appelées en début de fichier ////////////////////////////////////////////////////
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
