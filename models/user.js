const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
