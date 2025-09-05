const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "mariadb", 
  logging: false,
  timezone: "-04:00",
});

module.exports = sequelize;
