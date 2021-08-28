const mongoose=require("mongoose");
// const Message = require("./Message.js");
// const Post=require("./Post.js");

const schema=new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true,
        default: ""
    },
    location: {
        type: String,
        required: true,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    description:{
        type: String,
        default: ""
    },
    avatar: Buffer,
    posts:[ ],
    friendsIds:[ mongoose.Schema.Types.ObjectId ],
    currentChatters:[ mongoose.Schema.Types.ObjectId ],
    messages:[  ],
    unreadMes: {
        type: Number,
        default: 0
    },
    unreadNot: {
        type: Number,
        default: 0
    },
    unreadFri: {
        type: Number,
        default: 0
    },
    unreadInv: {
        type: Number,
        default: 0
    },
    signUpTime:{
        type: Date,
        default: Date.now
    }
});


module.exports=mongoose.model("User", schema);