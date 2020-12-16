"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
// Register validation
const registerValidation = (data) => {
    const schema = {
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(6).required()
    };
    //@ts-ignore
    return joi_1.default.validate(data, schema);
};
exports.registerValidation = registerValidation;
// login validation
const loginValidation = (data) => {
    const schema = {
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(6).required()
    };
    //@ts-ignore
    return joi_1.default.validate(data, schema);
};
exports.loginValidation = loginValidation;
//# sourceMappingURL=validation.js.map