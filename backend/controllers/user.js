////// Appel des modules bcrypt pour le hachage du mot de passe et de jsonwebtoken pour la création de token ///////
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

/////// Création utilisateur /////////////////////////////////////////////////////////////////
exports.signup = (req, res, next) => {
  /////// Hachage du mot de passe (10 fois ici) ///////////////////////////////////////////////////////////////
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        /////// Création du mot de passe hashé pour stockage sécurisé sur base de données ////////
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

////// Connexion utilisateur ////////////////////////////////////////////////////////////////
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //////comparaison entre mot de passe entré et mot de passe créé/hashé lors de signup //////
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            ////// Création du token pour chaque userId ////////////////////////////////////////////
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
