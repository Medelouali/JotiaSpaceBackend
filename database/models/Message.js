const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
    sender_id: mongoose.Schema.Types.ObjectId,
    receiver_id: mongoose.Schema.Types.ObjectId,
    chatterName: String,
    chatter_image: Buffer,
    chats:[ 
        {
            sender_id: mongoose.Schema.Types.ObjectId,
            chat: String,
            timeStamp: {
                type: Date,
                default: Date.now,
            },
            sent:{
                type: Boolean,
                default: false
            },
            received:{
                type: Boolean,
                default: false
            },
            viewed:{
                type: Boolean,
                default: false
            }
        }
    ] 
});

module.exports=mongoose.model("Message", messageSchema);