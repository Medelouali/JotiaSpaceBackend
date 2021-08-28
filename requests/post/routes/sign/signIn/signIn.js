const { SignInSchema } = require("../../../../../logic/joi/joiSchema");
const User=require("../../../../../database/models/User.js");
const jwt=require("jsonwebtoken");

const { validPassword } = require("../../../../../logic/requests/helpers");

const signIn=async(req, res)=>{
    const response={
        error: "",
        data: {},
        tokens: {}
    };

    const valid=SignInSchema.validate(req.body);
    if(valid.error){
        response.error=valid.error.details[0].message;
        return res.status(400).send(response);
    };

    try {
        const user=await User.findOne({email: req.body.email});
        if(user){
            const isValid=await validPassword(req.body.password, user.password);
            if(!isValid){
                response.error="Wrong password, please try again";
                return res.status(400).send(response);
            };
            response.data={ username, email, occupation, location, bio, description, posts,
                            friendsIds, currentChatters, messages, unreadMes,unreadNot,
                            unreadFri, unreadInv, signUpTime }=user;
            const token=jwt.sign({_id: user._id, email: user.email}, process.env.JWT_KEY);
            response.tokens["authToken"]=token;
            return res.status(200).send(response);
        }
        response.error="You don't have an account, please register";
        return res.status(400).send(response);
    } catch (error) {
        response.error="Connection error, please try later";
        console.log(error);
        return res.status(400).send(response);
    }


}

module.exports=signIn;