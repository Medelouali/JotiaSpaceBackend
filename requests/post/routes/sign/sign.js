const express=require("express");
const router=express.Router();
const signUp=require("./signUp/signUp");
const signIn=require("./signIn/signIn");

router.post('/signUp', signUp);
router.post('/signIn', signIn);

module.exports=router;