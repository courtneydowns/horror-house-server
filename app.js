require("dotenv").config();

const express = require("express");
const app = express();

const sequelize = require("./db");

app.use(require("../middleware/headers"));

app.use(express.json());

sequelize.sync({
  // force: true,
});

const user = require("./controllers/usercontroller");
app.use("/user", user);

const profile = require("./controllers/profilecontroller");
app.use("/profile", profile);

const comment = require("./controllers/commentcontroller");
app.use("/comment", comment);

const review = require("./controllers/reviewcontroller");
app.use("/review", review);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on port http://localhost${process.env.PORT}`
  );
});
