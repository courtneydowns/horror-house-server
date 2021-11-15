const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("horror-house", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
  // dialectOptions: {
  // 	ssl: {
  // 		require: true,
  // 		rejectUnauthorized: false,
  // 	},
  // },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
