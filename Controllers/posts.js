const Post = require("../Models/posts");
const User = require("../Models/users");

exports.postCreatePost = (req, res, next) => {
  const title = req.body.title;
  const desc = req.body.desc;
  console.log(req.userId);
  if (title == null) {
    const err = new Error("Title cannot be empty.");
    err.statusCode = 400;
    throw err;
  }
  Post.create({
    title: title,
    desc: desc,
    userId: req.userId,
  })
    .then((post) => {
      res.status(201).json({ message: "Post created!", post: post });
    })
    .catch((err) => next(err));
};

exports.getPost = (req, res, next) => {
  const postId = req.params.id;
  let loadedPost;
  Post.findByPk(postId)
    .then((post) => {
      loadedPost = post;
      if (post == null) {
        const err = new Error("Post doesn't exist");
        err.statusCode = 404;
        throw err;
      }
      res.status(200).json({ message: "Post found", post: post });
    })
    .catch((err) => next(err));
};

exports.patchClosePost = (req, res, next) => {
  //check if its same user
  const postId = req.params.id;
  Post.findByPk(postId)
    .then((post) => {
      if (post == null) {
        const err = new Error("Post doesn't exist");
        err.statusCode = 404;
        throw err;
      }
      if(req.userId!==post.userId){
        const err = new Error("Not Authorized");
        err.statusCode = 401;
        throw err;
      }
      post.open = false;
      return post.save();
    })
    .then((post) => {
      res.status(200).json({ message: "Post Closed", post: post });
    })
    .catch((err) => next(err));
};
