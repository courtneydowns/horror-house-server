require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const PORT = process.env.port;

app.use(require("./middleware/headers"));
app.use(express.json());

let user = require("./controllers/usercontroller");
app.use("/user", user);

let review = require("./controllers/reviewcontroller");
app.use("/review", review);

const controllers = require("./controllers");

app.use("/profile", controllers.profile);
app.use("/comment", controllers.comment);
app.use("/movie", controllers.movie);

sequelize.sync({
  // force: true,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
