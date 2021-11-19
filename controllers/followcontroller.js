let express = require("express");
let router = express.Router();
const { User } = require("../models");
let validateSession = require("../middleware/validateSession");

/*FOLLOW USER*/
router.post("/follow/:userId", validateSession, function (req, res) {
  const { user } = req;
  const { userId } = req.params;
  const followed = User.findOne({ where: { id: parseInt(userId) } });
  const result2 = followed.update({
    followers: [...newSet([...followed.followers, parseInt(user.id)])],
  });
  const result = user.update({
    following: [...new Set([...user.following, parseInt(userId)])],
  });
  res
    .status(200)
    .json({
      success: true,
      following: result.following,
      followers: result2.followers,
      message: "Success!",
    })
    .catch((err) =>
      res.status(500).json({ error, message: "Oops. Something went wrong!" })
    );
});

/*UNFOLLOW USER*/
router
  .post("unfollow/:userId", validateSession, function (req, res) {
    const { user } = req;
    const { userId } = req.params;
    const unfollowed = User.findOne({ where: { id: parseInt(userId) } });
    const result2 = unfollowed.update({
      followers: [
        ...new Set([
          ...unfollowed.followers.filter((f) => f !== parseInt(user.id)),
        ]),
      ],
    });
    const result = user.update({
      following: [
        ...new Set([...user.following.filter((f) => f !== parseInt(userId))]),
      ],
    });
    res.status(200).json({
      success: true,
      following: result.following,
      follwers: result2.followers,
      message: "Success!",
    });
  })
  .catch((err) =>
    res.status(500).json({ error, message: "Oops. Something went wrong!" })
  );

/*GET FOLLOWING AND FOLLOWERS*/
router.get("/follows/:userId", validateSession, function (req, res) {
  try {
    const { following, followers } =
      req.user.id === req.params.userId
        ? req.user
        : User.findOne({
            where: { id: req.params.userId },
          });
    const users = User.findAll({
      where: { id: { [Op.in]: [...new Set([...following, ...followers])] } },
    });
    res.status(200).json({ users, success: true, message: "Success!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error, err);
  }
});
