let express = require("express");
const { User } = require("../models");
let router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*SIGN UP*/
router.post("/signup", function (req, res) {
  User.create({
    profileImage: req.body.user.profileImage,
    username: req.body.user.username,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
    isAdmin: req.body.user.isAdmin,
  })
    .then(function signupSuccess(user) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 270,
        }
      );
      res.status(200).json({
        user: user,
        message: "Your account has been successfully created!",
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

/*SEARCH USERS*/
router.get("/search", function (req, res) {
  User.findOne()
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
