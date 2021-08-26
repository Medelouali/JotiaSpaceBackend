const User=require("../../../../../database/models/User");
const mongoose=require("mongoose");

const myPosts=async(req, res)=>{
    const response={ error: "", data: [], done: false};
    try {
        const user=await User.findById(mongoose.Types.ObjectId(req.payload._id));
        if(user){
            response.data=user.posts;
            response.done=true;
            return res.status(200).send(response);
        }else{
            response.error="We could't find this user";
        }
    } catch (error) {
        response.error="Please check out your network connection";
    }
    return res.status(400).send(response);
}

module.exports=myPosts;