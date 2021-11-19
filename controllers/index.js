const user = require("./usercontroller");
const comment = require("./commentcontroller");
const SearchResult = require("./searchresultcontroller");
const profile = require("./profilecontroller");
const like = require("./likecontroller");
const favorite = require("./favoritecontroller");
const databaseMovie = require("./databasemoviecontroller");

module.exports = {
  user,
  comment,
  SearchResult,
  profile,
  like,
  favorite,
  DatabaseEntry,
};
