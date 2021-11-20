const express = require("express");
const { User } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validateSession");

/*SIGN UP FOR NEW USER*/
router.post("/signup", function (req, res) {
  User.create({
    profilePhoto: req.body.user.profilePhoto,
    username: req.body.user.username,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
    isAdmin: req.body.user.isAdmin,
  })
    .then(function createSuccess(user) {
      let token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 270,
        }
      );
      res.json({
        user: user,
        message: "User successfully created!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

/*LOGIN*/
router.post("/", function (req, res) {
  console.log(process.env.JWT_SECRET);
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.password, (err, match) => {
          if (match) {
            let token = jwt.sign(
              { id: user.id, username: user.username },
              process.env.JWT_SECRET,
              { expiresIn: 60 * 60 * 270 }
            );

            res.status(200).json({
              user: user,
              message: "User successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(403).json({ error: "Password is incorrect" });
          }
        });
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

/*UPDATE PASSWORD*/
router.post("/update-password", validateSession, async (req, res) => {
  try {
    const { id } = req.user;
    const { password, newPassword } = req.body;
    const user = await User.findOne({ where: { id } });
    user
      ? bcrypt.compare(password, user.passwordhash, async (err, match) => {
          if (match) {
            //change password
            const passwordhash = bcrypt.hashSync(newPassword, 13);
            await user.update({ passwordhash });
            res.status(200).json({ success: true });
          } else {
            res.status(502).json({
              message: "Incorrect Password!",
              err,
              success: false,
            });
          }
        })
      : res.status(500).json({ message: "Oops. Something went wrong!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failure", err });
  }
});

/*SEARCH FOR A USER*/
router.get("/search/:string", validateSession, async (req, res) => {
  try {
    const { string } = req.params;
    const usersRaw = await User.findAll({
      where: {
        [Op.or]: [{ username: { [Op.iLike]: `%${string}%` } }],
      },
      attributes: ["username", "profilePhoto", "id"],
      limit: 6,
    });
    const users = usersRaw.map((user) => {
      return { ...user.dataValues, url: `/main/profile/${user.id}` };
    });
    res.status(200).json({ success: true, users, message: "success!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Something went wrong!" });
  }
});

/*FOLLOW USER*/
router.post("/follow/:userId", validateSession, async (req, res) => {
  const { user } = req;
  const { userId } = req.params;
  const followed = await User.findOne({ where: { id: parseInt(userId) } });
  const result2 = await followed.update({
    followers: [...newSet([...followed.followers, parseInt(user.id)])],
  });
  const result = await user.update({
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
    .catch((error) =>
      res.status(500).json({ error, message: "Oops. Something went wrong!" })
    );
});

/*UNFOLLOW USER*/
router.post("/unfollow/:userId", validateSession, async (req, res) => {
  try {
    const { user } = req;
    const { userId } = req.params;
    const unfollowed = await User.findOne({ where: { id: parseInt(userId) } });
    const result2 = await unfollowed.update({
      followers: [
        ...new Set([
          ...unfollowed.followers.filter((f) => f !== parseInt(user.id)),
        ]),
      ],
    });
    const result = await user.update({
      following: [
        ...new Set([...user.following.filter((f) => f !== parseInt(userId))]),
      ],
    });
    // console.log(result);
    res.status(200).json({
      success: true,
      following: result.following,
      followers: result2.followers,
      message: "Success!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Something went wrong!" });
  }
});

/*GET FOLLOWING AND FOLLOWERS*/
router.get("/follows/:userId", validateSession, async (req, res) => {
  try {
    const { following, followers } =
      req.user.id === req.params.userId
        ? req.user
        : await User.findOne({
            where: { id: req.params.userId },
            // attributes: ["following", "followers"],
          });
    const users = await User.findAll({
      where: { id: { [Op.in]: [...new Set([...following, ...followers])] } },
      attributes: ["username", "photo", "role", "id", "email"],
    });
    res.status(200).json({ users, success: true, message: "Success!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Something went wrong!" });
  }
});

module.exports = router;
