////// Utilisation du framework express ////////////////////////////////////////////////////

const express = require("express");

const router = express.Router();

////// Appel du controller user ////////////////////////////////////////////////////////////
const userCtrl = require("../controllers/user");

/////// Construction des routes pour les users et appel de la fonction correspondante dans le controller///////
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
