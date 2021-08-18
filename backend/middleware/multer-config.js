////// Appel du module multer pour traitement des images de sauce ////////////////////////////////////////////////////////////
const multer = require("multer");

////// Désignation des formats d'image concernés /////////////////////////////////////////////////////////////////////////////
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
////// Fonction native de multer de storage /////////////////////////////////////////////////////////////////////////////////////////////
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    ////// Remplacement des éventuels espaces dans le nom du fichier par des _ //////////////////////////////////////////////
    const name = file.originalname.split(" ").join("_");

    ///// Extension du fichier selon MIME TYPE + Date en millisecondes pour distinguer de tout fichier similaire ////////////////////////
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
