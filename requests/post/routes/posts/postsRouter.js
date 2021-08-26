const router=require("express").Router();
const savePost=require("./savePost/savePost.js");
const allPosts=require("./allPosts/allPosts.js");
const myPosts = require("./myPosts/myPosts.js");

router.post("/savePost", savePost);
router.post("/allPosts", allPosts);
router.post("/myPosts", myPosts);

module.exports=router;