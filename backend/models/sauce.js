const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: Number, required: true },
  imageUrl: { type: Number, required: true },
  heat: { type: Number, required: true },
});

module.exports = mongoose.model("Sauce", sauceSchema);
