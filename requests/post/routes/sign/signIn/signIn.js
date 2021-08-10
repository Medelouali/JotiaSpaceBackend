const { SignInSchema } = require("../signUp/joiSchema.js");
const User=require("../../../../../database/models/User.js");

const { digest } = require("../signUp/helpers");

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
        const pass=await digest(req.body.password);
        const user=await User.findOne({email: req.body.email});
        if(user){
            console.log(`pass: ${pass}, \npassword: ${user.password}`);
            if(user.password!==pass){
                response.error="Wrong password, please try again";
                return res.status(400).send(response);
            }
            response.data=user;
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