const mongoose=require("mongoose");


const schema=new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    bio: String,
    avatar: Buffer,
    posts:[
        {
            categorie: {
                type: String,
                default: ""
            },
            poster_name: String,
            urls:[ String ],
            description: {
                type: String,
                default: ""
            },
            comments:[
                {
                    commenter_id: mongoose.Schema.Types.ObjectId,
                    comment: {
                        type: String,
                        required: true
                    },
                }
            ],
            loves: {
                type: Number,
                default: 0
            },
            likes: {
                type: Number,
                default: 0
            },
            dislikes: {
                type: Number,
                default: 0
            },
            lools: {
                type: Number,
                default: 0
            }
        }
    ],
    friends_id:[ mongoose.Schema.Types.ObjectId ],
    current_chatters:[ mongoose.Schema.Types.ObjectId ],
    messages:[
        {
            sender_id: mongoose.Schema.Types.ObjectId,
            receiver_id: mongoose.Schema.Types.ObjectId,
            chatter_name: String,
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
                    receiver:{
                        type: Boolean,
                        default: false
                    },
                    viewed:{
                        type: Boolean,
                        default: false
                    }
                }
            ] 
        }
    ],
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
    }
});


module.exports=mongoose.model("User", schema);