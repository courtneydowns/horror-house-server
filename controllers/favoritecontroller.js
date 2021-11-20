let express = require("express");
let router = express.Router();
const { Movie, Favorite, User } = require("../models");
let validateSession = require("../middleware/validateSession");

/*ADDING A FAVORITE (TO MOVIE)*/
router.post(
  "/:movieId/movie/:favoriteId/upvote",
  validateSession,
  async (req, res) => {
    const { movieId, favoriteId } = req.params;
    const userId = req.user.id;

    try {
      const movie = await Movie.findOne({
        where: { id: movieId, favoriteId },
        include: { model: User },
      });

      if (!movie) {
        res.status(403).json({ message: `Whoops. You took a wrong turn!` });
        console.log(
          `Movie does not exist at upvote on a movie, favoritecontroller.js, line 22`
        );
        return;
      }

      const upvotes = await movie.addUpvote(userId);

      if (upvotes === -1) {
        res
          .status(400)
          .json({ message: "Nice try! You can only upvote once!" });
        return;
      }

      /*UPDATE ARRAY OF VOTERS*/
      await Movie.update({ voters: movie.voters }, { where: { id: postId } });

      /*PERSIST THE CHANGES*/
      const updatedMovie = await movie.save();

      res
        .status(200)
        .json({ movie: updatedMovie, success: true, add: "upvote" });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

/*REMOVE AN UPVOTE*/
router.post(
  "/:movieId/movie/:favoriteId/upvote",
  validateSession,
  async (req, res) => {
    const { movieId, favoriteId } = req.params;
    const userId = req.user.id;

    try {
      const movie = await Movie.findOne({
        where: { id: favoriteId, movieId },
        include: { model: User },
      });
      if (!movie) {
        res
          .status(403)
          .json({ message: `Whoops! You must have gotten here on accident!` });
        console.log(
          `Post does not exist at remove upvote, favoritecontroller.js, line 59`
        );
        return;
      }

      const upvotes = await movie.removeUpvote(userId);

      if (upvotes === -1) {
        res.status(400).json({ message: "You haven't voted on this yet!" });
        return;
      }
      /*UPDATE THE ARRAY "VOTERS"*/

      await Movie.update({ voters: movie.voters }, { where: { id: movieId } });

      /*PERSIST THE CHANGES*/
      const updatedMovie = await movie.save();

      res
        .status(200)
        .json({ success: true, movie: updatedMovie, remove: "upvote" });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

module.exports = router;
