const express = require("express");

const app = express();

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

app.use("/api/auth/signup", (req, res, next) => {
  const inscription = [
    { email: "jeanedgar@gonit.org", password: "ABCDEFRTGH" },
  ];
  res.status(200).json(inscription);
});

module.exports = app;
