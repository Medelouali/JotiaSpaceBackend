const express=require("express");
const router=express.Router();
const signUp=require("./signUp/signUp");
const signIn=require("./signIn/signIn");

router.get("/", (req, res)=>{
    return res.status(200).send({data: "Server is up and running", error: false});
});
router.post('/signUp', signUp);
router.post('/signIn', signIn);

module.exports=router;