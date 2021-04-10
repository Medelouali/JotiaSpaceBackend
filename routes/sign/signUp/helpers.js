const bcrypt=require("bcryptjs");
const User=require("../../../models/users");

const digest=async(password)=>{
    const salt=await bcrypt.genSalt(16);
    const hashed=await bcrypt.hash(password, salt);
    return hashed;
}

const isInDatabase=async(em)=>{
    // User.findOne({ email: em }, (err, result)=>{
    //     if(err) flag=true;
    //     console.log(err);
    //     console.log(result);
    // });
    
    const user=await User.findOne({email: em}).exec();
    console.log(user);
    if(user) return true;
    return false;
    
}
module.exports={ digest, isInDatabase };