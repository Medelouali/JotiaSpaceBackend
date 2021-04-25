const { SignInSchema } = require("../signUp/joiSchema");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const pool = require("../../../models/pool");

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

    pool.query(`SELECT * FROM client WHERE userEmail=$1`, [req.body.email])
        .then(async(user)=>{
            console.log(user);
            const isValid=await bcrypt.compare(req.body.password, user.userpassword);
            if(!isValid){
                response.error="Incorrect password, please try THE FORGET PASSWORD option.";
                return res.send(response);
            }
            const token=jwt.sign({_id: user._id}, process.env.JWT_KEY);
            res.header("auth-token", token);
            user.password="";
            response.data=user;
            return res.status(200).send(response);
        })
        .catch((err)=>{
            response.error="You don't have an account, please sign up.";
            console.error(err);
            return res.send(response);
        })
}

module.exports=signIn;