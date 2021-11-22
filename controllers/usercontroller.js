const express = require("express");
const { User } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*SIGN UP FOR NEW USER*/
router.post("/signup", function (req, res) {
  User.create({
    profilePhoto: req.body.user.profilePhoto,
    username: req.body.user.username,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
    isaAdmin: req.body.user.isAdmin,
  })
    .then(function signupSuccess(user) {
      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 480,
        }
      );
      res.json({
        user: user,
        message: "User succesfully created!",
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
        let token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 * 480 }
        );

        res.status(200).json({
          user: user,
          message: "User successfully logged in!",
          sessionToken: token,
        });
      } else {
        res.status(500).json({ error: "user does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
