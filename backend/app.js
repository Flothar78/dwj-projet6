const express = require("express");

const app = express();

app.use("/api/sauces", (req, res, next) => {
  const sauces = [
    {
      _id: "sauceBleue",
      title: "Sauce Bleue",
      description: "Couleur gout et force de la sauce",
      imageUrl: "",
      price: 700,
      userId: "qsomihvqios",
    },
    {
      _id: "sauceRouge",
      title: "Sauce Bleue",
      description: "Couleur rouge  gout relevé et force extrême de la sauce",
      imageUrl: "",
      price: 800,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(sauces);
});

module.exports = app;
