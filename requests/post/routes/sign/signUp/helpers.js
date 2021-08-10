const bcrypt=require("bcryptjs");

const digest=async(password)=>{
    const salt=await bcrypt.genSalt(16);
    const hashed=await bcrypt.hash(password, salt);
    return hashed;
}

const isInDatabase=async(em)=>{
    // try {
    //     const doesExist=await User.findOne({email: em});
    //     console.log(doesExist);
    //     return doesExist ? true: false;
    // } catch (error) {
    //     console.log(error);
    //     return true;
    // }
    return false;
}
module.exports={ digest, isInDatabase };