const User=require("../../../../../database/models/User.js");

const saveIt=async(req, res, next)=>{
    const post=req.body;
    console.log(post);
};

module.exports=saveIt;