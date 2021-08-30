const Sequelize = require("sequelize");

const sequalize = require("../util/database");

const Post = sequalize.define("post", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  desc: { type: Sequelize.STRING },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  open: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});
module.exports = Post;
