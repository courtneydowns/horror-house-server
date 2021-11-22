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
  wantToWatchMovie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  searchId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  databaseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Comment;
