const bcrypt=require("bcryptjs");
const User=require("../../../../../database/models/User.js");

const digest=async(password)=>{
    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(password, salt);
    return hashed;
}

const validPassword=async(pass, hash)=>{
    const isValid=await bcrypt.compare(pass, hash);
    return isValid;
}
const isInDatabase=async(em)=>{
    try {
        const doesExist=await User.findOne({email: em});
        return doesExist ? true: false;
    } catch (error) {
        console.log(error);
        return true;
    }
}
module.exports={ digest, isInDatabase, validPassword };