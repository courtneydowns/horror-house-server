const { DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  seenMovie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notSeenMovie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wantToWatchMovie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Comment;
