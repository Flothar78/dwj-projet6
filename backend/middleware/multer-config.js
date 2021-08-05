const multer = require("multer");

const types = {
  "image/jpg": ".jpg",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/bmp": ".bmp",
  "image/webp": ".webp",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + types[file.mimetype]);
  },
});

module.exports = multer({ storage: storage }).single("image");
