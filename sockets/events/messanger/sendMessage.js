const User=require("../../../models/User");
const alreadyTalked = require("./logic/helpers");

//date={from: id, to: id, msg: text};
const sendMessage = async(socket)=>{
    return(data)=>{
        console.log("sendMessage is running");
        //const alreadyIn=alreadyTalked(data.from, data.to);
    };
};

module.exports=sendMessage;