let express = require("express");
let router = express.Router();
const { Favorite } = require("../models");
let validateSession = require("../middleware/validateSession");

/*ADDING FAVORITE*/
router.post("/", validateSession, function (req, res) {
  const favorite = {
    numberofFavorites: req.body.favorite.numberOfFavorites,
  };
  Favorite.create(favorite)
    .then((favorite) => res.status(200).json(favorite))
    .catch((err) => res.status(500).json({ error: err }));
});

/*REMOVE FAVORITE*/
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, userId: req.user.id } };
  Favorite.destroy(query)
    .then((favorites) =>
      res.status(200).json({ message: "Your comment has been removed " })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
