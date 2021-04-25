const bcrypt=require("bcryptjs");
//const User=require("../../../models/users");
const pool=require("../../../models/pool");

const digest=async(password)=>{
    const salt=await bcrypt.genSalt(16);
    const hashed=await bcrypt.hash(password, salt);
    return hashed;
}

const isInDatabase=async(em)=>{
    let flag=false;
    try {
        const doesExist=await pool.query("SELECT * FROM client WHERE useremail=$1", [em]);
        flag=(doesExist.rows[0] ? true: false);
    } catch (error) {
        console.log(error);
    }
    return flag;
}
module.exports={ digest, isInDatabase };