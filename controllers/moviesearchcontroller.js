let express = require("express");
let router = express.Router();
const { Movie, Comment } = require("../models");

/* GET ALL MOVIES */
router.post("/", function (req, res) {
  Movie.findAll({ include: Comment })
    .then((movie) => res.status.json(200).json(movie))
    .catch((err) => res.status(500).json({ error: err }));
});

/* GET MOVIE BY NAME */
router.get("/:title", function (req, res) {
  Movie.findOne({ where: { title: req.params.title }, include: Comment })
    .then((movie) => res.status(200).json(movie))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
