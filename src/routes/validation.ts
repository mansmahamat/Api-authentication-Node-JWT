import { Document } from 'mongoose';
import Joi from '@hapi/joi'



// Register validation
export const registerValidation = (data: Document) => {
    const schema= {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
};
//@ts-ignore
 return Joi.validate(data, schema);
}

// login validation
export const loginValidation = (data :Document) => {
    const schema= {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
};
//@ts-ignore
 return Joi.validate(data, schema);
}

