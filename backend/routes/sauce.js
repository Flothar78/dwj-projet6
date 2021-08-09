const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceCtrl = require("../controllers/sauce");

router.get("/", sauceCtrl.getAllSauce);
router.post("/", multer, sauceCtrl.createSauce);

router.put("/:id", multer, sauceCtrl.modifySauce);

router.delete("/:id", sauceCtrl.deleteSauce);

router.get("/:id", sauceCtrl.getOneSauce);

module.exports = router;
