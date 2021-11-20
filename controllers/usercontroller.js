const express = require("express");
const { User } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validateSession");

/*SIGN UP FOR NEW USER*/
router.post("/signup", (req, res) => {
  const { password, email, username, profilePhoto } = req.body;

  User.create({
    passwordhash: bcrypt.hashSync(password, 13),
    username,
    email,
    profilePhoto,
  })
    .then((user) => {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json(200).json({
        user: {
          id: user.id,
          email,
          username,
        },
        message: `Success! Account created for ${username}`,
        sessionToken: token,
        sucess: true,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

/*LOGIN*/
router.post("/", (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    where: { username },
  })
    .then((user) => {
      console.log(user);
      if (user) {
        bcrypt.compare(password, user.passwordhash, (err, match) => {
          if (match) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            delete user.passwordhash;
            res.status(200).json({
              user,
              message: `Success! ${user.username} logged in!`,
              success: true,
              sessionToken: token,
            });
          } else {
            res.status(502).send({ message: "Incorrect password" });
          }
        });
      } else {
        res.status(500).json({ message: "User does not exist" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", err })
    );
});

/*LOGIN*/
// router.post("/", (req, res) => {
//   console.log(process.env.JWT_SECRET);
//   const { username, password } = req.body;
//   User.findOne({
//     where: {
//       username: { username },
//     },
//   })
//     .then((user) => {
//       if (user) {
//         bcrypt.compare(password, user.passwordhash, (err, match) => {
//           if (match) {
//             const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//               expiresIn: 60 * 60 * 270,
//             });
//             delete user.passwordhash;
//             res.status(200).json({
//               user: user,
//               message: "User successfully logged in!",
//               sessionToken: token,
//             });
//           } else {
//             res.status(403).json({ error: "Password is incorrect" });
//           }
//         });
//       } else {
//         res.status(500).json({ error: "User does not exist." });
//       }
//     })
//     .catch((err) => res.status(500).json({ error: err }));
// });

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
