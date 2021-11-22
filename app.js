require("dotenv").config();
const express = require("express");
// db = require("./db");
const app = express();
const sequelize = require("./db");
const PORT = process.env.port;

const controllers = require("./controllers");

let user = require("./controllers/usercontroller");
let review = require("./controllers/reviewcontroller");
let profile = require("./controllers/profilecontroller");
let comment = require("./controllers/commentcontroller");
let searchMovie = require("./controllers/searchmoviecontroller");

app.use(require("./middleware/headers"));

app.use(express.json());

app.use("/user", user);

app.use("/review", review);

app.use("/profile", profile);

app.use("/comment", comment);

app.use("/search", searchMovie);

app.use("/favorite", controllers.favorite);
app.use("/like", controllers.like);
// app.use("/search", controllers.searchMovie);

// let searchComment = require("./controllers/searchComment");
// app.use("/movie-search-comment", searchComment);

// let movieDatabase = require("./controllers/moviedatabasecontroller");
// app.use("/movie-database", movieDatabase);

sequelize.sync({
  // force: true,
});

// db.sync({
//   force: true,
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const sequelize = require("./db");
// controllers = require("./controllers");
// const PORT = process.env.port;

// app.use(require("./middleware/headers"));
// app.use(express.json());

// let review = "./controllers/reviewcontroller";
// let search = "./controllers/searchresultcontroller";
// let database = "./controllers/databasentry";

// app.use("/like", controllers.like);

// app.use("/profile", controllers.profile);

// app.use("/comment", controllers.comment);

// app.use("/favorite", controllers.favorite);

// app.use("/user", controllers.user);

// app.use("/reviews", review);

// app.use("/search-results", search);

// app.use("/movie-database", database);

// sequelize.sync({
//   // force: true,
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server is listening on port ${process.env.PORT}`);
// });

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const sequelize = require("./db");
// const PORT = process.env.port;

// app.use(require("./middleware/headers"));
// app.use(express.json());

// let user = require("./controllers/usercontroller");
// app.use("/user", user);

// let review = require("./controllers/reviewcontroller");
// app.use("/review", review);

// const controllers = require("./controllers");

// app.use("/profile", controllers.profile);
// app.use("/comment", controllers.comment);
// app.use("/movie", controllers.movie);

// sequelize.sync({
//   // force: true,
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server is listening on port ${process.env.PORT}`);
// });
