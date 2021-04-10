const User=require("../../../models/users");

const userData=async(req, res)=>{
    const response={
        error: "",
        data: {}
    };
    let code=200;
    try {
        const user=await User.findOne({email: req.payload.email});
        // console.log(req.payload.email);
        if(!user){
            response.error="Looks like you don't have an account, please try again";
            code=404;
        }else
            response.data=user;
    } catch (error) {
            response.error="Couldn't fetch the data, it's probably a network error";
            code=400;
    }
    return res.status(code).send(response);
};

module.exports=userData;