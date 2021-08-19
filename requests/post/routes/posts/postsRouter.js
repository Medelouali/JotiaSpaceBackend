const router=require("express").Router();
const savePost=require("./savePost/savePost.js");

router.post("/savePost", savePost);

module.exports=router;