const User = require("./user");
const Review = require("./review");
const Profile = require("./profile");
const Comment = require("./searchComment");
const MovieDatabase = require("./movieDatabase");
const Like = require("./like");
const Favorite = require("./favorite");
const MovieSearch = require("./movieSearch");
const SearchComment = require("./searchComment");
const DatabaseComment = require("./databaseComment");

//USER
User.hasMany(Review);
Review.belongsTo(User);
User.hasOne(Profile);
Profile.belongsTo(User);
User.hasMany(Comment);
SearchComment.belongsTo(User);
DatabaseComment.belongsTo(User);

//MOVIE, REVIEW, COMMENT
MovieSearch.hasMany(Review);
Review.belongsTo(MovieSearch);
Review.hasMany(SearchComment);
Review.hasMany(DatabaseComment);
Like.hasOne(MovieSearch);

//MOVIE, REVIEW, COMMENT, FAVORITE
MovieDatabase.hasMany(Review);
Review.belongsTo(MovieDatabase);
MovieSearch.hasMany(Review);
Review.hasMany(SearchComment);
Review.hasMany(DatabaseComment);
Favorite.belongsTo(MovieDatabase);
MovieDatabase.hasMany(Favorite);
Favorite.belongsTo(MovieSearch);
MovieSearch.hasMany(Favorite);

//MOVIE SEARCH RESULTS, REVIEW, COMMENT
MovieSearch.hasMany(Review);
Review.belongsTo(MovieSearch);
Review.hasMany(SearchComment);
Review.hasMany(DatabaseComment);
SearchComment.belongsTo(Review);

//MOVIE DATABASE, REVIEW, COMMENT
MovieDatabase.hasMany(Review);
Review.belongsTo(MovieDatabase);
MovieDatabase.hasMany(DatabaseComment);
MovieSearch.hasMany(SearchComment);
DatabaseComment.belongsTo(Review);
Like.hasOne(MovieDatabase);

//LIKES
Like.belongsTo(User);
User.hasMany(Like);

//FAVORITES
Favorite.belongsTo(User);
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
