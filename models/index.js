const User = require("./user");
const Review = require("./review");
const Profile = require("./profile");
const Comment = require("./comment");
const MovieDatabase = require("./movieDatabase");
const Like = require("./like");
const Favorite = require("./favorite");
const SearchResult = require("./movieSearch");

//USER
User.hasMany(Review);
Review.belongsTo(User);
User.hasOne(Profile);
Profile.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
User.hasMany(Comment);

//MOVIE SEARCH RESULTS, REVIEW, COMMENT
SearchResult.hasMany(Review);
Review.belongsTo(SearchResult);
Review.hasMany(Comment);
Comment.belongsTo(Review);
SearchResult.hasMany(Like);

//MOVIE DATABASE, REVIEW, COMMENT
MovieDatabase.hasMany(Review);
Review.belongsTo(MovieDatabase);
MovieDatabase.hasMany(Comment);
Comment.belongsTo(Review);
// Like.hasOne(MovieDatabase);
MovieDatabase.hasMany(Like);

//LIKES
Like.belongsTo(User);
Like.belongsTo(Comment);
Comment.hasMany(Like);
User.hasMany(Like);

//FAVORITES
Favorite.belongsTo(User);
Favorite.belongsTo(MovieDatabase);
Favorite.belongsTo(SearchResult);
MovieDatabase.hasMany(Favorite);
SearchResult.hasMany(Favorite);
User.hasMany(Favorite);

module.exports = {
  User,
  Review,
  Profile,
  Comment,
  SearchResult,
  MovieDatabase,
  Like,
  Favorite,
};
