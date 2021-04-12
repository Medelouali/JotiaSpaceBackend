const User=require("../../../models/users");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const { digest, isInDatabase } =require("./helpers");
const { SignUpSchema } =require("./joiSchema");


const signUp=async(req, res, next)=>{
    const response={
        error: "",
        data: {}
    };

    if(req.body.password!==req.body.confirm){
        response.error="Please make sure the passwords do match";
        return res.send(response);
    }
    const result=SignUpSchema.validate(req.body);
    if(result.error){
        response.error=result.error.details[0].message;
        return res.send(response);
    }
    
    let hashed;
    try{
        hashed=await digest(req.body.password);
    }catch(e){
        response.error="Networking error, please try again";
        return res.send(response);
    }

    try {
        const inDatabase= await isInDatabase(req.body.email);
        console.log(inDatabase);
        if(inDatabase){
            response.error="This email has been already used, please use another one";
            return res.send(response);
        }
    } catch (error) {
        console.log(error)
    }

    const user=new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        location: req.body.location,
        occupation: req.body.occupation,
        password: hashed
    });
    
    
    user.save((error, result)=>{
        if(error){
            response.error="Networking error, please try again";
            console.log(error);
            res.send(response);
            return;
        }
        result.password="";
        response.data=result;
        const token=jwt.sign({email: result.email}, process.env.JWT_KEY);
        res.header("auth-token", token);
        res.send(response);
    }) 
}

module.exports=signUp;