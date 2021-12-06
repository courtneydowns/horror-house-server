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
  imdbID: {
    type: DataTypes.STRING,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

module.exports = Comment;
