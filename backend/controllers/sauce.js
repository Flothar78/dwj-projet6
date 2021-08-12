const Sauce = require("../models/sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  console.log(req.file.filename);
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json(req.body.sauce))
    .catch((error) => res.status(402).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(409).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(207).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  const sauceId = req.params.id;
  const like = req.body.like;
  const userId = req.body.userId;

  console.log(sauceId);
  console.log(like);
  console.log(userId);

  Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      let usersLiked = sauce.usersLiked;
      let usersDisliked = sauce.usersDisliked;

      let user = userId; //Elément à rechercher
      switch (like) {
        case 1:
          for (let i = 0; i < usersLiked.length; i++) {
            if (user === usersLiked[i]) {
              res.status(200).json({ message: "Utilisateur déjà liké" });
            }
          }
          sauce.likes += 1;
          sauce.usersLiked.push(user);

          for (let i = 0; i < usersDisliked.length; i++) {
            if (user === usersDisliked[i]) {
              sauce.dislike -= 1;
              sauce.usersDisliked.splice([i], 1);
            }
          }
          sauce.save();
          res.status(200).json({});
          break;
        case -1:
          for (let i = 0; i < usersDisliked.length; i++) {
            if (user === usersDisliked[i]) {
              res.status(200).json({ message: "Utilisateur déjà disliké" });
            }
          }
          sauce.dislikes += 1;
          sauce.usersDisliked.push(user);

          for (let i = 0; i < usersLiked.length; i++) {
            if (user === usersLiked[i]) {
              sauce.likes -= 1;
              sauce.usersLiked.splice([i], 1);
            }
          }
          sauce.save();
          res.status(200).json({});
          break;
        case 0:
          for (let i = 0; i < usersDisliked.length; i++) {
            if (user === usersDisliked[i]) {
              sauce.dislikes -= 1;
              sauce.usersDisliked.splice([i], 1);
              sauce.save();
              res.status(200).json({ message: "Utilisateur déjà disliké" });
            }
          }

          for (let i = 0; i < usersLiked.length; i++) {
            if (user === usersLiked[i]) {
              sauce.likes -= 1;
              sauce.usersLiked.splice([i], 1);
              sauce.save();
              res.status(200).json({});
            }
          }
          break;
      }
    })
    .catch((error) => res.status(407).json({ error }));
};
