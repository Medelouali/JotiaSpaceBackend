const User=require("../../../models/users");
const { SignInSchema } = require("../signUp/joiSchema");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


const signIn=async(req, res, next)=>{
    const response={
        error: "",
        data: {}
    };

    const valid=SignInSchema.validate(req.body);
    if(valid.error){
        response.error=valid.error.details[0].message;
        return res.send(response);
    }

    try {
        
    } catch (error) {
        console.log(error);
    }
    try {
        const user=await User.findOne({email: req.body.email});
        if(!user){
            response.error="You don't have an account, please sign up.";
            return res.send(response);
        }
        const isValid=await bcrypt.compare(req.body.password, user.password);
        if(!isValid){
            response.error="Incorrect password, please try THE FORGET PASSWORD option.";
            return res.send(response);
        }
        const token=jwt.sign({_id: user._id}, process.env.JWT_KEY);
        res.header("auth-token", token);
        user.password="";
        response.data=user;
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
    }
}

module.exports=signIn;