const { DataTypes } = require("sequelize");
const db = require("../db");

const MovieSearch = db.define("movie-search", {
  poster_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  overview: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  release_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vote_average: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = MovieSearch;