const Joi = require('@hapi/joi');




//Validation of schema for version 16.1.7 Please refer documentation if it changes 

//Register validation
const registerValidation = data => {

    const validationSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    });

    return validationSchema.validate(data);
};


const loginValidation = data => {

    const validationSchema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    });

    return validationSchema.validate(data);
};



module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;