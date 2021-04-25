const sendInvitation = require("./messanger/sendInvitation");
const sendMessage = require("./messanger/sendMessage");

const handleEvent=(socket)=>{
    socket.on("Message", sendMessage(socket));
    socket.on("Invitation", sendInvitation(socket));
};

module.exports=handleEvent;