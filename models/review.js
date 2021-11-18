const { DataTypes } = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  review: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  scaryScale: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recommend: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // userId: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
});

module.exports = Review;
