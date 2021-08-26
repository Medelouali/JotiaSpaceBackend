const emitters = require("./emitters/emitters");
const listeners = require("./listeners/listeners");

const handleEvent=(io, socket)=>{
    console.log("User has just connected, id: ", socket.id);
    listeners(io, socket);
    emitters(io, socket);
};

module.exports=handleEvent;