const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("la requête a bien été reçue");
  next();
});

app.use((rep, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue" });
  next();
});

app.use((req, res, next) => {
  console.log("la réponse a bien été envoyée");
});

module.exports = app;
