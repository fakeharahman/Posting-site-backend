const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("chat-app", "root", "Mysql123", {
  dialect: "mysql",
  host: "chat-app-db.cvnrfsaugc6h.us-east-2.rds.amazonaws.com",
  port:"3306"
});

module.exports = sequelize;