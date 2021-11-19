const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  profileImage: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = User;
