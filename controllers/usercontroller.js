const express = require("express");
const { User } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validateSession");

// ALL OUR CONTROLLERS FOR USER GO HERE
router.post("/signup", function (req, res) {
  const { username, name, password, email } = req.body;

  User.create({
    username,
    name,
    passwordhash: bcrypt.hashSync(password, 13),
    email,
  })
    .then(function signupSuccess(user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });
      res.status(200).json({
        user,
        message: `Success! Profile for ${username} created!`,
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/", (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    where: { username: username },
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.passwordhash, (err, match) => {
          if (match) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 86400,
            });
            res.status(200).json({
              user,
              message: `User ${user.profile_name} logged in!!`,
              sessionToken: token,
            });
          } else {
            res.status(502).send({ message: "Incorrect Password", err });
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

router.get("/checkAvail/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const response = await User.findOne({ where: { username } });
    if (response) {
      res.status(200).json(false);
    } else {
      res.status(200).json(true);
    }
  } catch (err) {
    res.status(402).json({ err });
  }
});

router.put("/", validateSession, async (req, res) => {
  const { username, name, email } = req.body;
  const { id } = req.user;
  const updateUser = { username, name, email };
  const query = { where: { id } };
  try {
    const result = await User.update(updateUser, query);
    if (!result[0]) {
      res.status(403).json({ message: "Account not found" });
    } else {
      res.status(200).json({ message: `${name}'s profile has been updated!'` });
    }
  } catch (err) {
    res.status(500).json({ message: "Opps, something went wrong!", err });
  }
});

module.exports = router;
// let express = require("express");
// const { User } = require("../models");
// let router = express.Router();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// /*GET USERS ENDPOINT */
// router.get("/", function (req, res) {
//   User.findAll()
//     .then((post) => res.status(200).json(post))
//     .catch((err) => res.status(500).json({ error: err }));
// });

// /* SIGNUP*/
// router.post("/signup", function (req, res) {
//   User.create({
//     profileImage: req.body.user.profileImage,
//     username: req.body.user.username,
//     email: req.body.user.email,
//     password: bcrypt.hashSync(req.body.user.password, 13),
//     isAdmin: req.body.user.isAdmin,
//   })
//     .then(function createSuccess(user) {
//       let token = jwt.sign(
//         { id: user.id, username: user.username },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: 60 * 60 * 24,
//         }
//       );
//       res.json({
//         user: user,
//         message: "User successfully created!",
//         sessionToken: token,
//       });
//     })
//     .catch((err) => res.status(500).json({ error: err }));
// });

// /*LOGIN*/
// router.post("/login", function (req, res) {
//   console.log(process.env.JWT_SECRET);
//   User.findOne({
//     where: {
//       username: req.body.user.username,
//     },
//   })
//     .then(function loginSuccess(user) {
//       if (user) {
//         bcrypt.compare(req.body.user.password, user.password, (err, match) => {
//           if (match) {
//             let token = jwt.sign(
//               { id: user.id, username: user.username },
//               process.env.JWT_SECRET,
//               { expiresIn: 60 * 60 * 270 }
//             );

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

// module.exports = router;

// /*DELETE USER (ADMIN) */
// // router.delete("/admin/delete/:id", validateSession, function (req, res) {
// //   if (req.user.isAdmin === "true") {
// //     const query = { where: { id: req.params.id } };
// //     User.destroy(query)
// //       .then((user) => res.status(200).json(user))
// //       .catch((err) => res.status(500).json({ error: err }));
// //   } else {
// //     res.status(401).json({ message: "Unauthorized" });
// //   }
// // });

// // const express = require("express");
// // const { User } = require("../models");
// // const router = express.Router();
// // const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcryptjs");

// // router.post("/signup", function (req, res) {
// //   User.create({
// //     profilePhoto: req.body.user.profilePhoto,
// //     username: req.body.user.username,
// //     email: req.body.user.email,
// //     password: bcrypt.hashSync(req.body.user.password, 13),
// //     isAdmin: req.body.user.isAdmin,
// //   })
// //     .then(function signupSuccess(user) {
// //       let token = jwt.sign(
// //         { id: user.id, username: user.username },
// //         process.env.JWT_SECRET,
// //         {
// //           expiresIn: 86400,
// //         }
// //       );
// //       res.status(200).json({
// //         user,
// //         message: `Success! Profile for ${username} created!`,
// //         sessionToken: token,
// //       });
// //     })
// //     .catch((err) => res.status(500).json({ error: err }));
// // });

// // router.post("/login", (req, res) => {
// //   const { username } = req.body;
// //   User.findOne({
// //     where: { username: username },
// //   })
// //     .then(function loginSuccess(user) {
// //       if (user) {
// //         bcrypt.compare(req.body.user.password, user.password, (err, match) => {
// //           if (match) {
// //             let token = jwt.sign(
// //               { id: user.id, username: user.username },
// //               process.env.JWT_SECRET,
// //               { expiresIn: 86400 }
// //             );

// //             res.status(200).json({
// //               user: user,
// //               message: "User successfully logged in!",
// //               sessionToken: token,
// //             });
// //           } else {
// //             res.status(403).json({ error: "Password is incorrect" });
// //           }
// //         });
// //       } else {
// //         res.status(500).json({ error: "User does not exist." });
// //       }
// //     })
// //     .catch((err) => res.status(500).json({ error: err }));
// // });

// // module.exports = router;

// // let express = require("express");
// // const { User } = require("../models");
// // let router = express.Router();
// // const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcryptjs");

// // /*GET USERS ENDPOINT */
// // router.get("/", function (req, res) {
// //   User.findAll()
// //     .then((post) => res.status(200).json(post))
// //     .catch((err) => res.status(500).json({ error: err }));
// // });

// // /* SIGNUP*/
// // router.post("/register", function (req, res) {
// //   User.create({
// //     profilePhoto: req.body.user.profilePhoto,
// //     username: req.body.user.username,
// //     email: req.body.user.email,
// //     password: bcrypt.hashSync(req.body.user.password, 13),
// //     isAdmin: req.body.user.isAdmin,
// //   })
// //     .then(function createSuccess(user) {
// //       let token = jwt.sign(
// //         { id: user.id, username: user.username },
// //         process.env.JWT_SECRET,
// //         {
// //           expiresIn: 60 * 60 * 270,
// //         }
// //       );
// //       res.json({
// //         user: user,
// //         message: "User successfully created!",
// //         sessionToken: token,
// //       });
// //     })
// //     .catch((err) => res.status(500).json({ error: err }));
// // });

// // /*LOGIN*/
// // router.post("/", function (req, res) {
// //   console.log(process.env.JWT_SECRET);
// //   User.findOne({
// //     where: {
// //       username: req.body.user.username,
// //     },
// //   })
// //     .then(function loginSuccess(user) {
// //       if (user) {
// //         bcrypt.compare(req.body.user.password, user.password, (err, match) => {
// //           if (match) {
// //             let token = jwt.sign(
// //               { id: user.id, username: user.username },
// //               process.env.JWT_SECRET,
// //               { expiresIn: 60 * 60 * 270 }
// //             );

// //             res.status(200).json({
// //               user: user,
// //               message: "User successfully logged in!",
// //               sessionToken: token,
// //             });
// //           } else {
// //             res.status(403).json({ error: "Password is incorrect" });
// //           }
// //         });
// //       } else {
// //         res.status(500).json({ error: "User does not exist." });
// //       }
// //     })
// //     .catch((err) => res.status(500).json({ error: err }));
// // });

// // module.exports = router;

// // /*DELETE USER (ADMIN) */
// // // router.delete("/admin/delete/:id", validateSession, function (req, res) {
// // //   if (req.user.isAdmin === "true") {
// // //     const query = { where: { id: req.params.id } };
// // //     User.destroy(query)
// // //       .then((user) => res.status(200).json(user))
// // //       .catch((err) => res.status(500).json({ error: err }));
// // //   } else {
// // //     res.status(401).json({ message: "Unauthorized" });
// // //   }
// // // });
