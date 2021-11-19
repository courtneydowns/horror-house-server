require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const PORT = process.env.port;

let user = require("./controllers/usercontroller");
app.use("/user", user);

app.use(require("./middleware/headers"));
app.use(express.json());

let review = require("./controllers/reviewcontroller");
app.use("/review", review);

let like = require("./controllers/likecontroller");
app.use("/like", like);

let profile = require("./controllers/profilecontroller");
app.use("/profile", profile);

let comment = require("./controllers/commentcontroller");
app.use("/comment", comment);

let movie = require("./controllers/moviecontroller");
app.use("/movie", movie);

let favorite = require("./controllers/favoritecontroller");
app.use("/favorite", favorite);

sequelize.sync({
  // force: true,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
