////// Utilisation du framework express ////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

////// Appel des middlewares auth et multer /////////////////////////////////////////////
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

////// Appel du controller sauce ////////////////////////////////////////////////////////////
const sauceCtrl = require("../controllers/sauce");

/////// Construction des routes pour les sauces et appel de la fonction correspondante dans le controller///////
////// Appel des middlewares auth et multer ///////

router.get("/", auth, sauceCtrl.getAllSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;
