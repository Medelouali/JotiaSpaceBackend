const mongoose=require("mongoose");
{/* <Field field_name="Country/City" label="countryCity"/>
            <Field field_name="Product Name" label="productName"/>
            <Field field_name="Last Price(USD)" label="lastPrice"/>
            <Field field_name="Items Number" label="itemsNumber"/>            
            <Field field_name="Product Lifetime" label="productLiftime"/>            
            <Field field_name="Model/Type" label="modelType"/> */}
const postSchema=new mongoose.Schema({
        posterName:{
            type: String,
            required: true
        },
        countryCity:{
            type: String,
            default: ""
        },
        productName:{
            type: String,
            default: ""
        },
        lastPrice:{
            type: String,
            default: "0$"
        },
        itemsNumber:{
            type: String,
            default: ""
        },
        productLifetime:{
            type: String,
            default: "1 day"
        },
        model:{
            type: String,
            default: ""
        },
        categorie: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        poster_id: {
            commenter_id: mongoose.Schema.Types.ObjectId
        },
        urls:[ Buffer ],
        postTime:{
            type: Date,
            default: Date.now
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
    });

module.exports=mongoose.model("Post", postSchema);