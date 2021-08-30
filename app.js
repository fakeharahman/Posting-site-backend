const express = require("express");
const app = express();
const authRoutes = require("./Routes/auth");
const postRoutes=require("./Routes/posts")
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const User = require("./Models/users");
const Post = require("./Models/posts");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(authRoutes);
app.use(postRoutes)
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data || [];
  res.status(status).json({ message: message, data: data });
});
const PORT = process.env.PORT || 7070;
User.hasMany(Post);
sequelize.sync().then((res) => {
  console.log("connected");
  app.listen(PORT);
});
