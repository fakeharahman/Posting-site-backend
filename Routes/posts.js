const express=require("express")
const router=express.Router();

const postRoutes=require("../Controllers/posts");
const isAuth = require("../middleware/is-auth");

router.post("/create-post", isAuth, postRoutes.postCreatePost);
router.get("/get-post/:id", postRoutes.getPost);
router.patch("/close-post/:id", isAuth, postRoutes.patchClosePost);

module.exports=router;