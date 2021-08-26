const sendInvitation = require("./social/sendInvitation/sendInvitation");


const emitters=(io, socket)=>{
    console.log("emitters: ", socket.id);
    sendInvitation(io, socket);
}


module.exports=emitters;