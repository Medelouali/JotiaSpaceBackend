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
    discreption:{
        type: String,
        default: ""
    },
    avatar: Buffer,
    posts:[ ],
    friends_id:[ mongoose.Schema.Types.ObjectId ],
    current_chatters:[ mongoose.Schema.Types.ObjectId ],
    messages:[  ],
    unread_mes: {
        type: Number,
        default: 0
    },
    unread_not: {
        type: Number,
        default: 0
    },
    unread_fri: {
        type: Number,
        default: 0
    },
    unread_inv: {
        type: Number,
        default: 0
    },
    signUpTime:{
        type: Date,
        default: Date.now
    }
});


module.exports=mongoose.model("User", schema);