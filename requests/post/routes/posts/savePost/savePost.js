const User=require("../../../../../database/models/User.js");
const mongoose=require("mongoose");

const savePost=async(req, res, next)=>{
    try {
        const user=await User.findById(mongoose.Types.ObjectId("610eb713baac6749309d8251"));
        // console.log(req.payload._id);
        // console.log("_id: ", req.payload._id);
        console.log("user: ", user);
        // console.log(user);
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};

module.exports=savePost;