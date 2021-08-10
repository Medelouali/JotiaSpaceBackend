const User=require("../../../../../database/models/User.js");

const jwt=require("jsonwebtoken");
const { digest, isInDatabase } =require("./helpers");
const { SignUpSchema } =require("./joiSchema");


const signUp=async(req, res, next)=>{
    var response={
        error: "",
        data: {}
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
        const token=jwt.sign({email: response.data.email}, process.env.JWT_KEY);
        res.header("auth-token", token);
        const inDatabase= await isInDatabase(req.body.email);
        if(inDatabase){
            response.error="This email has been already used, please use another one";
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
        return res.status(200).send({error: "", data: savedUser});
    }catch(err){
        console.log(err);
        response.error="Connection error, please try later";
        return res.status(400).send(response);
    }    
}

module.exports=signUp;