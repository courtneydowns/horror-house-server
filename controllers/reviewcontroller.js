const express = require("express");
const router = express.Router();
const { User, Review } = require("../models/review");
const validateSession = require("../middleware/validateSession");

// let express = require("express");
// // const { Review } = require("../models");
// let router = express.Router();
// let validateSession = require("../middleware/validate-session");

/*CREATING A REVIEW*/
router.post("/create", validateSession, function (req, res) {
  const reviewEntry = {
    title: req.body.reviews.title,
    rating: req.body.reviews.rating,
    review: req.body.reviews.review,
    scaryScale: req.body.reviews.scaryScale,
    recommend: req.body.reviews.recommend,
    movie: req.movie.imdbId,
    owner: req.user.id,
  };
  Reviews.create(reviewEntry)
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json({ error: err }));
});

/*VIEW ALL REVIEWS BY MOVIE*/
router.get("/:imdbId", function (req, res) {
  let imdbId = req.params.movieid;
  Reviews.findAll({
    where: { title: req.movie.title, imdbId: imdbId },
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json({ error: err }));
});

/*GET REVIEWS BY YOU*/
router.get("/mine", validateSession, function (req, res) {
  let userid = req.user.id;
  Reviews.findAll({
    where: { owner: userid },
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json({ error: err }));
});

/*GET REVIEWS BY A SPECIFIC USER*/
router.get("/user-reviews", function (req, res) {
  Reviews.findAll({
    where: { owner: req.user.id, username: req.params.username },
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json({ error: err }));
});

/*EDIT REVIEW*/
router.put("/edit/:entryId", validateSession, function (req, res) {
  const updateReview = {
    title: req.body.params.title,
    rating: req.body.reviews.rating,
    review: req.body.reviews.review,
    scaryScale: req.body.reviews.scaryScale,
    recommend: req.body.reviews.recommend,
  };
  const query = { where: { id: req.params.entryId, owner: req.user.id } };
  Reviews.update(updateReview, query)
    .then((review) =>
      res.status(200).json({ message: "The Post has been updated." })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

/*DELETE A REVIEW*/
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };
  Review.destroy(query)
    .then((reviews) =>
      res.status(200).json({ message: "Your review has been deleted." })
    )
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
