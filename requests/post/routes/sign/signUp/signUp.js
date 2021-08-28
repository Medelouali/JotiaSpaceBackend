const User=require("../../../../../database/models/User.js");

const jwt=require("jsonwebtoken");
const { digest, isInDatabase } =require("../../../../../logic/requests/helpers");
const { SignUpSchema } =require("../../../../../logic/joi/joiSchema.js");


const signUp=async(req, res)=>{
    const response={
        error: "",
        data: {},
        tokens: {}
    };

    if(req.body.password!==req.body.confirm){
        response.error="Please make sure the passwords do match";
        return res.send(response);
    };

    const result=SignUpSchema.validate(req.body);
    if(result.error){
        response.error=result.error.details[0].message;
        return res.send(response);
    };
    
    let hashed;
    try{
        hashed=await digest(req.body.password);
    }catch(e){
        response.error="Networking error, please try again";
        return res.send(response);
    };

    try {
        const inDatabase= await isInDatabase(req.body);
        if(inDatabase!==null){
            response.error=inDatabase;
            return res.send(response);
        }
    } catch (error) {
        response.error="This email might have been used before, please use another one";
        return res.status(400).send(response);
    };

    const userInstance=new User({
        username: req.body.username,
        email: req.body.email,
        location: req.body.location,
        occupation: req.body.occupation,
        password: hashed
    });
    
    try{
        const savedUser= await userInstance.save();
        const token=jwt.sign({email: savedUser.email, _id: savedUser._id}, process.env.JWT_KEY, {expiresIn: "1h"});
        response.tokens["authToken"]=token;
        response.data={ username, email, occupation, location, bio, description, posts,
            friendsIds, currentChatters, messages, unreadMes,unreadNot,
            unreadFri, unreadInv, signUpTime }=savedUser;
        return res.status(200).send(response);
    }catch(err){
        console.log(err);
        response.error="Connection error, please try later";
        return res.status(400).send(response);
    }    
}

module.exports=signUp;