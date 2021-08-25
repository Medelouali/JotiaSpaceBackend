const User=require("../../../../../database/models/User.js");
const mongoose=require("mongoose");
const { PostSchema } = require("../../../../../logic/joi/joiSchema.js");
const Post = require("../../../../../database/models/Post.js");


const savePost=async(req, res)=>{
    const response={ error: {}, data: "", done: false};

    try{
        const product={
            posterName: req.body.post.posterName,
            model: req.body.post.model,
            countryCity: req.body.post.countryCity,
            lastPrice: req.body.post.lastPrice,
            productName: req.body.post.productName,
            itemsNumber: req.body.post.itemsNumber,
            productLifetime: req.body.post.productLifetime,
            category: req.body.post.category,
            description: req.body.post.description
        };
        const result=PostSchema.validate(product);
        if(result.error){
            response.error=result.error.details[0].message;
            console.log(response);
            return res.status(400).send(response);
        };
        
        const post=new Post(product);
        const user=await User.findByIdAndUpdate(mongoose.Types.ObjectId(req.payload._id), {
            $push: {
                posts: post
            }
        });
        console.log(user);
        response.done=true;
        response.data="Post uploaded successfully...";
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};

module.exports=savePost;