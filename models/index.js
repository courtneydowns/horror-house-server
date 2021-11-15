// const { sequelize, synceDb } = require("../db");
// const { DataTypes } = require("sequelize");

const User = require("./user");
const Review = require("./review");
const Profile = require("./profile");
const Comment = require("./comment");
const Movie = require("./movie");

User.hasMany(Review);
Review.belongsTo(User);
User.hasOne(Profile);
Profile.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
Movie.hasMany(Review);
Review.belongsTo(Movie);
Review.hasMany(Comment);

module.exports = { User, Review, Profile, Comment, Movie };
