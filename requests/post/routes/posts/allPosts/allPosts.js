const User = require("../../../../../database/models/User.js");

const allPosts=async(req, res)=>{
    const response={
        error:"",
        data: []
    }

    try {
        const posts=await User.find();
        posts.forEach(user =>response.data=response.data.concat([...user.posts]));
        response.data=response.data.sort((a, b) => 0.5 - Math.random());
        return res.status(200).send(response);
    } catch (error) {
        response.error="Connection error, please check out your network";
        return res.status(400).send(response);
    }
}


module.exports=allPosts;