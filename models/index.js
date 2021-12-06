const User = require("./user");
const Review = require("./review");
const Profile = require("./profile");
const Comment = require("./comment");
const MovieDatabase = require("./movieDatabase");
const Like = require("./likeReview");
const Movie = require("./favoriteMovie");
const SearchResult = require("./searchResults");

//USER
User.hasMany(Review), { foreignKey: "ownerId" };
Review.belongsTo(User), { foreignKey: "reviewAuthor" };
User.hasOne(Profile);
Profile.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User), { foreignKey: "commentAuthor" };

//MOVIE, REVIEW, COMMENT
// SearchResult.hasMany(Review), { foreignKey: "reviewAuthor" };
// Review.belongsTo(SearchResult), { foreignKey: "reviewAuthor" };
Review.hasMany(Comment), { foreignKey: "reviewAuthor" };
// Like.hasOne(SearchResult);

//MOVIE, REVIEW, COMMENT, FAVORITE
// MovieDatabase.hasMany(Review), { foreignKey: "reviewAuthor" };
// Review.belongsTo(MovieDatabase), { foreignKey: "reviewAuthor" };
// SearchResult.hasMany(Review), { foreignKey: "reviewAuthor" };
Review.hasMany(Comment), { foreignKey: "reviewAuthor" };
// Favorite.belongsTo(MovieDatabase), { foreignKey: "favorite_author" };
// MovieDatabase.hasMany(Favorite), { foreignKey: "favorite_author" };
// Favorite.belongsTo(MovieDatabase), { foreignKey: "favoriteAuthor" };
// Like.belongsTo(Review), { foreignKey: "reviewAuthor" };
// MovieDatabase.hasMany(Favorite), { foreignKey: "favoriteAuthor" };

//MOVIE SEARCH RESULTS, REVIEW, COMMENT
// // SearchResult.hasMany(Review), { foreignKey: "reviewAuthor" };
// Review.belongsTo(SearchResult), { foreignKey: "reviewAuthor" };
Review.hasMany(Comment), { foreignKey: "reviewAuthor" };
// Review.hasMany(DatabaseComment);
Comment.belongsTo(Review), { foreignKey: "reviewAuthor" };

//MOVIE DATABASE, REVIEW, COMMENT
//
// SearchResult.hasMany(Comment);
// DatabaseComment.belongsTo(Review);
Comment.belongsTo(Review);
// MovieDatabase.hasMany(Favorite), { foreignKey: "favoriteAuthor" };

//LIKES
// Like.belongsTo(User);
// User.hasMany(Like);

//FAVORITES
Movie.belongsTo(User), { foreignKey: "favoriteAuthor" };
User.hasMany(Movie), { foreignKey: "favoriteAuthor" };

module.exports = {
  User,
  Review,
  Profile,
  Comment,
  SearchResult,
  MovieDatabase,
  Like,
};
