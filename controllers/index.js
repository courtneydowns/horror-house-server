const user = require("./usercontroller");
const searchComment = require("./searchComment");
const SearchResult = require("./searchresultcontroller");
const profile = require("./profilecontroller");
const like = require("./likecontroller");
const favorite = require("./favoritecontroller");
const DatabaseEntry = require("./databasemoviecontroller");

module.exports = {
  user,
  searchComment,
  SearchResult,
  profile,
  like,
  favorite,
  DatabaseEntry,
};
