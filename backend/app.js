const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(bodyParser.json());

app.post("/api/auth/signup", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Objet créé !",
  });
  next();
});

app.use(bodyParser.json());

app.post("/api/auth/login", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Login OK",
  });
  next();
});

app.use("/api/sauces", (rep, res, next) => {
  const sauces = [
    {
      userId: "12a31b2de31153123a318861",
      name: "Sauce Bleue",
    },
    {
      userId: "12a31b2de312f23fd23a318861",
      name: "Sauce Rouge",
    },
    {
      userId: "12a31b2de312f2d123a318861",
      name: "Sauce Jaune",
    },
    { userId: "12a31b2de312ac48123a318861", name: "Sauce Verte" },
  ];
  res.status(202).json(sauces);
  next();
});

module.exports = app;
