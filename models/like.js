const { DataTypes } = require("sequelize");
const db = require("../db");

const Like = db.define("like", {
  numberofLikes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Like;
