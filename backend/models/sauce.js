////// Utilisation de l'outil de modélisation des données Mongoose ///////

const mongoose = require("mongoose");

////// Schéma de l'objet sauce /////////////////////////////////////
const sauceSchema = mongoose.Schema({
  userId: { type: String, require: true },
  name: { type: String, require: true },
  manufacturer: { type: String, require: true },
  description: { type: String, require: true },
  mainPepper: { type: String, require: true },
  imageUrl: { type: String, require: true },
  heat: { type: Number, require: true },
  likes: { type: Number, require: true, default: 0 },
  dislikes: { type: Number, require: true, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

////// Export du schéma sauce pour utilisation dans les controllers /////////
module.exports = mongoose.model("Sauce", sauceSchema);
