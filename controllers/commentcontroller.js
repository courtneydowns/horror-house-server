let express = require("express");
let router = express.Router();
const { Comment } = require("../models");
let validateSession = require("../middleware/validateSession");

/* GET ALL COMMENTS */
router.get("/", validateSession, function (req, res) {
  Comment.findAll()
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

/* GET ALL COMMENTS FOR A MOVIE*/
router.get("comment/:imdbId", validateSession, function (req, res) {
  Comment.findAll({
    where: {
      id: req.params.imdbId,
    },
  })
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

/*CREATING A COMMENT ASSIGNED TO MOVIE*/
router.post("/comment/:imdbId", validateSession, function (req, res) {
  const commentEntry = {
    comment: req.body.comment.comment,
    seenMovie: req.body.comment.seenMovie,
    notSeenMovie: req.body.comment.notSeenMovie,
    wantToWatchMovie: req.body.comment.wantToWatchMovie,
    userId: req.user.id,
    imdbId: req.params.imdbId,
  };
  Comment.create(commentEntry)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

/*EDIT COMMENT*/
router.put("/edit/:id", validateSession, function (req, res) {
  const updateComment = {
    comment: req.body.comment.comment,
    seenMovie: req.body.comment.seenMovie,
    notSeenMovie: req.body.comment.notSeenMovie,
    wantToWatchMovie: req.body.comment.wantToWatchMovie,
  };
  const query = { where: { id: req.params.id, userId: req.user.id } };
  Review.update(updateComment, query)
    .then((comment) =>
      res.status(200).json({ message: "Your comment has been updated." })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

/*DELETE A COMMENT (WITH ADMIN PRIVILEGES)*/
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id } };
  console.log(req.user);
  Comment.findOne(query)
    .then((comment) => {
      if (req.user.id === comment.userId || req.user.isAdmin === "true") {
        Comment.destroy(query).then((comment) =>
          res.status(200).json({ message: "This comment has been deleted." })
        );
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
