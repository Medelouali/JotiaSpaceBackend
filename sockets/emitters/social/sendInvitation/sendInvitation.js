

const sendInvitation=(io, socket)=>{
    io.on("friendRequest", request=>{
        if(!access(request.tokens.authToken).denied){
            
        }
    });
};
const inv={
    fromId: "", 
    toId: ""
}
module.exports=sendInvitation;