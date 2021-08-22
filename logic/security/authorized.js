const jwt=require("jsonwebtoken");

const authorized = (req, res, next)=>{
    const token=req.cookies["Authentificaton-Token"];
    if(!token) return res.status(401).send({error: "Not authorized", data: {}});
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
