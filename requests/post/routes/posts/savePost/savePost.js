const User=require("../../../../../database/models/User.js");
const mongoose=require("mongoose");
const { PostSchema } = require("../../sign/signUp/joiSchema.js");
const Post = require("../../../../../database/models/Post.js");
const { findByIdAndUpdate } = require("../../../../../database/models/Post.js");


const savePost=async(req, res)=>{
    const response={ error: {}, data: "", done: false};

    try {
        const product={
            model: req.body.model,
            countryCity: req.body.countryCity,
            lastPrice: req.body.lastPrice,
            productName: req.body.productName,
            itemsNumber: req.body.itemsNumber,
            productLifetime: req.productLifetime,
            categorie: req.body.categorie,
            description: req.body.description,
            poster_id: req.payload._id
        };
        const result=PostSchema.validate(product);
        if(result.error){
            response.error=result.error.details[0].message;
            return res.status(400).send(response);
        };
        
        const post=new Post(product);
        const user=await User.findByIdAndUpdate(mongoose.Types.ObjectId(req.payload._id), {
            $push: {
                posts: post
            }
        });
        response.done="Post uploaded successfully...";
        response.data=user;
        console.log(error);
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};

module.exports=savePost;