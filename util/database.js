const { Sequelize } = require("sequelize");
const dbConfig=require("../config/db.config")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  dialect: "mysql",
  host: dbConfig.HOST,
  // port:"3306"
});
// const sequelize = new Sequelize("chat-app", "root", "Mysql123", {
//   dialect: "mysql",
//   host: "chat-app-db.cvnrfsaugc6h.us-east-2.rds.amazonaws.com",
//   port:"3306"
// });

module.exports = sequelize;