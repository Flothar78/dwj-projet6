const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const User = require("./models/user.js");
const Sauce = require("./models/sauce.js");
const app = express();

mongoose
  .connect(
    "mongodb+srv://Flothar78:Tortrock124!@cluster0.korbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(bodyParser.json());

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

app.post("/api/auth/signup", (req, res, next) => {
  const user = new User({
    userId: "",
    email: "",
    password: "",
  });
  user
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error: "error" });
    });
  next();
});

app.post("/api/auth/login", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Login OK",
  });
  next();
});

app.post("/api/sauces", (req, res, next) => {
  console.log(req.body.name);
  const sauce = new Sauce({
    userId: "userId",
    name: "" + req.body.name + "",
    manufacturer: "" + req.body.manufacturer + "",
    description: "description",
    mainPepper: "mainPepper",
    imageUrl: "imageUrl",
    heat: 5,
    likes: 0,
    dislikes: 0,
    usersLiked: "usersLiked",
    usersDisliked: "usersDisliked",
  });
  sauce
    .save()
    .then(() => res.status(201).json(req.body))
    .catch((error) => res.status(402).json({ error }));
  next();
});

app.use("/api/sauces", (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(207).json(sauces))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
