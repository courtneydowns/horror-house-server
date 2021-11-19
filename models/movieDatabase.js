const { DataTypes } = require("sequelize");
const db = require("../db");

const Movie = db.define("movie", {
  Poster: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Plot: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imdbRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Released: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Runtime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  Director: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Actors: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Movie;
