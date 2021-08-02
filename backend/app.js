const express = require("express");
const mongoose = require("mongoose");
const multer = require("./middleware/multer");

const User = require("./models/user");
const Sauce = require("./models/sauce");
const app = express();

mongoose
  .connect(
    "mongodb+srv://Flothar78:Tortrock124!@cluster0.korbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/auth/signup", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Login OK",
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

app.post("/api/sauces", multer, (req, res, next) => {
  console.log(req.body);
  let content = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    userId: "toto",
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    ...content,
  });
  sauce
    .save()
    .then(() => res.status(201).json(req.body))
    .catch((error) => res.status(402).json({ error }));
});

app.put("/api/sauces/:id", (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete("/api/stuff/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/sauces/:id", (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
});

app.use("/api/sauces", (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(207).json(sauces))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
