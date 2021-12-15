let express = require("express");
let router = express.Router();
const { Like } = require("../models");
let validateSession = require("../middleware/validateSession");

/*ADDING LIKE*/
router.post("/", validateSession, function (req, res) {
  const like = {
    numberofLikes: req.body.likes.numberOfLikes,
  };
  Like.create(like)
    .then((like) => res.status(200).json(like))
    .catch((err) => res.status(500).json({ error: err }));
});

/*REMOVE LIKE*/
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, userId: req.user.id } };
  Like.destroy(query)
    .then((likes) =>
      res.status(200).json({ message: "Your comment has been removed " })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
