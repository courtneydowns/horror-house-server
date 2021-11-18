const { DataTypes } = require("sequelize");
const db = require("../db");

const Profile = db.define("profile", {
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  favoriteHorrorMovies: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  wantToWatch: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  recommend: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dontRecommend: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // userId: {
  //   type: DataTypes.INTEGER,
  // },
});

module.exports = Profile;
