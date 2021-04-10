const jwt=require("jsonwebtoken");

const authenticated = async (req, res, next)=>{
    const token=req.header("auth-token");
    try{
        const verified=await jwt.verify(token, process.env.JWT_KEY);
        req.payload=verified;
        console.log(verified);
        next();
    }catch(e){
        return res.status(400).send({
            error: "Sorry, you must login first or sign up for a new account",
            data: ""
        })
    }
}

module.exports = { authenticated } ;