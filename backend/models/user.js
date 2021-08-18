////// Utilisation de l'outil de modélisation des données Mongoose ///////
const mongoose = require("mongoose");

////// Plugin natif de mongoose pour rendre utilisable une fois chaque adresse mail utilisateur /////
const uniqueValidator = require("mongoose-unique-validator");

////// Schéma de l'objet user /////////////////////////////////////
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

////// Export du schéma user pour utilisation dans les controllers /////////
module.exports = mongoose.model("User", userSchema);
