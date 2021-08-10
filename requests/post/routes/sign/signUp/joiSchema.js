const Joi=require("joi");

const SignUpSchema=Joi.object({
    username: Joi.string().min(4).max(100).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(8).max(1024).required(),
    location: Joi.string().required(),
    occupation: Joi.string().required(),
    confirm: Joi.ref("password")
});

const SignInSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

module.exports={ SignUpSchema, SignInSchema };