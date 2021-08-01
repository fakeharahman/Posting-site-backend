const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/users");

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  User.findAll({ where: { username: username } })
    .then((user) => {
      if (user.length !== 0) {
        const err = new Error("Username exists");
        err.statusCode = 422;
        throw err;
      }
      return User.findAll({ where: { email: email } });
    })
    .then((user) => {
      if (user.length !== 0) {
        const err = new Error("Email exists");
        err.statusCode = 422;
        throw err;
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPass) => {
      return User.create({
        username: username,
        email: email,
        password: hashedPass,
      });
    })
    .then((user) => {
      const { password, ...updatedUserObj } = user.dataValues;
      res
        .status(201)
        .json({ message: "User created!", userData: updatedUserObj });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findAll({ where: { email: email } })
    .then((user) => {
      loadedUser = user[0].dataValues;
      console.log(loadedUser);
      if (user.length === 0) {
        const err = new Error("Email or password doesn't match");
        err.statusCode = 401;
        throw err;
      }
      return bcrypt.compare(password, loadedUser.password);
    })
    .then((isPass) => {
      if (!isPass) {
        const err = new Error("Email or password doesn't match");
        err.statusCode = 401;
        throw err;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          username: loadedUser.username,
          userId: loadedUser.id,
        },
        "mysupersecretpassphrasedontshare",
        { expiresIn: "48h" }
      ); //will expire in 2 days
      const { password, ...updatedUserObj } = loadedUser;
      res
        .status(200)
        .json({
          message: "Login successful!",
          userData: { ...updatedUserObj, token: token },
        });
    })
    .catch((err) => {
      next(err);
    });
};
