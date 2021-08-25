const router=require("express").Router();
const savePost=require("./savePost/savePost.js");
const allPosts=require("./allPosts/allPosts.js");

router.post("/savePost", savePost);
router.post("/allPosts", allPosts);

module.exports=router;