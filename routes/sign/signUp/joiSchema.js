const Joi=require("joi");

const SignUpSchema=Joi.object({
    username: Joi.string().min(4).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirm: Joi.ref("password")
});

const SignInSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

module.exports={ SignUpSchema, SignInSchema };