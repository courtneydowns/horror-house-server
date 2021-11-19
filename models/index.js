const User = require("./user");
const Review = require("./review");
const Profile = require("./profile");
const Comment = require("./comment");
const MovieDatabase = require("./movieDatabase");
const Like = require("./like");
const Favorite = require("./favorite");
const SearchResult = require("./movieSearch");

//USER and REVIEW
User.hasMany(Review);
Review.belongsTo(User);

//USER and PROFILE
User.hasOne(Profile);
Profile.belongsTo(User);

//USER and COMMENT
User.hasMany(Comment);
Comment.belongsTo(User);

//MOVIE, REVIEW, COMMENT
SearchResult.hasMany(Review);
Review.belongsTo(SearchResult);
Review.hasMany(Comment);
Like.hasOne(SearchResult);
SearchResult.hasMany(Like);

//MOVIE, REVIEW, COMMENT, FAVORITE
MovieDatabase.hasMany(Review);
Review.belongsTo(MovieDatabase);
Review.belongsTo(SearchResult);
searchResult.hasMany(Review);
Review.hasMany(Comment);
Favorite.hasOne(MovieDatabase);
MovieDatabase.hasMany(Favorite);

//LIKES
Like.belongsTo(User);
Like.belongsTo(Comment);
Comment.hasMany(Like);
User.hasMany(Like);

//FAVORITES
Favorite.belongsTo(User);
Favorite.belongsTo(MovieDatabase);
MovieDatabase.hasMany(Favorite);
Favorite.belongsTo(SearchResult);
SearchResult.hasMany(Favorite);
User.hasMany(Favorite);

module.exports = {
  User,
  Review,
  Profile,
  Comment,
  MovieSearch,
  MovieDatabase,
  Like,
  Favorite,
};
