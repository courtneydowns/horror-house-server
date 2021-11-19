const { DataTypes } = require("sequelize");
const db = require("../db");

const DatabaseComment = db.define("comment", {
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
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
});

module.exports = DatabaseComment;
