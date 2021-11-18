const User = require("./user");
const Review = require("./review");
const Profile = require("./profile");
const Comment = require("./comment");
const Movie = require("./movie");
const Like = require("./like");
const Favorite = require("./favorite");

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
Movie.hasMany(Review);
Review.belongsTo(Movie);
Review.hasMany(Comment);

//LIKES
Like.belongsTo(User);
Like.belongsTo(Comment);
Comment.hasMany(Like);
User.hasMany(Like);

//FAVORITES
Favorite.belongsTo(User);
Favorite.belongsTo(Movie);
Movie.hasMany(Favorite);
User.hasMany(Favorite);

module.exports = {
  User,
  Review,
  Profile,
  Comment,
  Movie,
  Like,
  Favorite,
};
