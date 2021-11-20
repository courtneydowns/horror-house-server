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
  imdbId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Comment;
