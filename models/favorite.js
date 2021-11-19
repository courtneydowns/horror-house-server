const { DataTypes, DATE } = require("sequelize");
const db = require("../db");

const Favorite = db.define("favorite", {
  numberOfFavorites: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Favorite;
