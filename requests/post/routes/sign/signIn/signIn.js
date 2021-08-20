const { SignInSchema } = require("../signUp/joiSchema.js");
const User=require("../../../../../database/models/User.js");
const jwt=require("jsonwebtoken");

const { validPassword } = require("../signUp/helpers");

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
        const user=await User.findOne({email: req.body.email});
        if(user){
            const isValid=await validPassword(req.body.password, user.password);
            if(!isValid){
                response.error="Wrong password, please try again";
                return res.status(400).send(response);
            };
            response.data=user;
            const token=jwt.sign({_id: user._id, email: user.email}, process.env.JWT_KEY);
            res.header("auth-token", token);
            // console.log(token);
            return res.status(200).send(response);
        }
        response.error="You don't have an account, please register";
        return res.status(400).send(response);
    } catch (error) {
        response.error="Connection error, please try later";
        return res.status(400).send(response);
    }


}

module.exports=signIn;