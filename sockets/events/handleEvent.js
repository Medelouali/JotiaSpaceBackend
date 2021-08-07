const sendInvitation = require("./messanger/sendInvitation");
const sendMessage = require("./messanger/sendMessage");

const handleEvent=(socket)=>{
    console.log("User has just connected, id: ", socket.id);
};

module.exports=handleEvent;