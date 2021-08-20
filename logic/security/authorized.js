const jwt=require("jsonwebtoken");

const authorized = async (req, res, next)=>{
    const token=req.header("auth-token");
    if(!token) return res.status(400).send({error: "Not authorized", data: {}});
    try{
        const verified=jwt.verify(token, process.env.JWT_KEY);
        req.payload=verified;
        next();
    }catch(e){
        return res.status(400).send({
            error: "Sorry, you must login first or sign up for a new account.",
            data: {}
        })
    }
}

module.exports=authorized;
