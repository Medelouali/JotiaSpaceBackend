const Joi=require("joi");

const SignUpSchema=Joi.object({
    username: Joi.string().min(4).max(100).required(),
    email: Joi.string().email().max(200).required(),
    password: Joi.string().min(8).max(1024).required(),
    location: Joi.string().required(),
    occupation: Joi.string().required(),
    confirm: Joi.ref("password")
});

const SignInSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const PostSchema=Joi.object({
    category: Joi.string().max(100).required(),
    countryCity: Joi.string().max(100).required(),
    productName: Joi.string().max(100).required(),
    lastPrice: Joi.string().max(100).required(),
    model: Joi.string().max(100).required(),
    productLifetime: Joi.string().max(100).required(),
    itemsNumber: Joi.string().max(50).required(),
    description: Joi.string().max(2021).required()
});

module.exports={ SignUpSchema, SignInSchema,  PostSchema };