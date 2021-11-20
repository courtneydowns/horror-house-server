let express = require("express");
let router = express.Router();
const { Comment } = require("../models");
let validateSession = require("../middleware/validateSession");

/* GET ALL COMMENTS FOR SEARCHED MOVIE */
router.get("/", validateSession, function (req, res) {
  Comment.findAll()
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

/* GET ALL COMMENTS FOR A MOVIE (SEARCH)*/
router.get("search/:title", validateSession, function (req, res) {
  Comment.findAll({
    where: {
      title: req.params.imdbId,
    },
  })
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

/*CREATING A COMMENT ASSIGNED TO MOVIE (SEARCH)*/
router.post("/search/:title", validateSession, function (req, res) {
  const commentEntry = {
    comment: req.body.comment.comment,
    seenMovie: req.body.comment.seenMovie,
    wantToWatchMovie: req.body.comme.wantToWatchMovie,
    userId: req.user.id,
    title: req.params.imdbId,
  };
  Comment.create(commentEntry)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

/*EDIT COMMENT (FROM SEARCH)*/
router.put("/search/edit/:title", validateSession, function (req, res) {
  const updateComment = {
    comment: req.body.comment.comment,
    seenMovie: req.body.comment.seenMovie,
    wantToWatchMovie: req.body.comme.wantToWatchMovie,
  };
  const query = { where: { title: req.params.imdbId, userId: req.user.id } };
  Comment.update(updateComment, query)
    .then((comment) =>
      res.status(200).json({ message: "Your comment has been updated." })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

/*DELETE A COMMENT FROM SEARCH (WITH ADMIN PRIVILEGES)*/
router.delete("/delete/search/:id", validateSession, function (req, res) {
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

/* GET ALL COMMENTS FOR MOVIES (DATABASE)*/
router.get("/database/:id", validateSession, function (req, res) {
  Comment.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

/*CREATING A COMMENT ASSIGNED TO MOVIE (DATABASE)*/
router.post("/search/:id", validateSession, function (req, res) {
  const commentEntry = {
    comment: req.body.comment.comment,
    seenMovie: req.body.comment.seenMovie,
    wantToWatchMovie: req.body.comme.wantToWatchMovie,
    userId: req.user.id,
    id: req.params.id,
  };
  Comment.create(commentEntry)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

/*EDIT COMMENT (DATABASE)*/
router.put("/search/edit/:id", validateSession, function (req, res) {
  const updateComment = {
    comment: req.body.comment.comment,
    seenMovie: req.body.comment.seenMovie,
    wantToWatchMovie: req.body.comme.wantToWatchMovie,
  };
  const query = { where: { id: req.params.id, userId: req.user.id } };
  Comment.update(updateComment, query)
    .then((comment) =>
      res.status(200).json({ message: "Your comment has been updated." })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

/*DELETE A COMMENT FROM SEARCH (WITH ADMIN PRIVILEGES)*/
router.delete("/delete/search/:id", validateSession, function (req, res) {
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
