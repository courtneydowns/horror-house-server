const User = require("./user");
const Review = require("./review");
const Profile = require("./profile");
const Comment = require("./comment");
const Movie = require("./movie");
// const Message = require("./message");
// const Notification = require("./notification");
// const Conversation = require("./conversation");
// const ChatNotification = require("./chatNotification");
// const Like = require("./like");

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
// Like.belongsTo(Comment);
// Comment.hasMany(Like);

//CHAT
// Conversation.belongsTo(User, { as: "user1" });
// Conversation.belongsTo(User, { as: "user2" });
// Message.belongsTo(Conversation);
// Conversation.hasMany(Message);

//NOTIFICATIONS
// Notification.belongsTo(User);
// User.hasMany(Notification);

// ChatNotification.belongsTo(User);
// User.hasMany(ChatNotification);

module.exports = {
  User,
  Review,
  Profile,
  Comment,
  Movie,
  // Like,
  // Conversation,
  // Message,
  // Notification,
  // ChatNotification,
};
