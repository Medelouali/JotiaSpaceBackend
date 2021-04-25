//const User=require("../../../models/users");
const pool = require("../../../models/pool");
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
        if(inDatabase){
            response.error="This email has been already used, please use another one";
            return res.send(response);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send("Error");
    };

    const user=[
        req.body.username,
        req.body.email,
        req.body.location,
        req.body.occupation,
        hashed
    ];
    
    pool
        .query(`INSERT INTO client(username, userEmail, userLocation, userOccupation, userPassword) 
                VALUES($1, $2, $3, $4, $5) RETURNING *`, user)
        .then(result=>{
            response.data=result.rows;
            const token=jwt.sign({email: response.data.email}, process.env.JWT_KEY);
            res.header("auth-token", token);
            res.send(response);
        })
        .catch(err=>{
            if(err.constraint==="client_useremail_key")
                response.error="This email has been used, please choose another one.";
            else {
                response.error=err;
                return res.status(400).send(response);
            }
        });
}

module.exports=signUp;