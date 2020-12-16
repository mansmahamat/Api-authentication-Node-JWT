"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = require("../routes/validation");
const router = express_1.Router();
router.post('/register', async (req, res) => {
    // Validate Data before we create user
    const { error } = validation_1.registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    //Check if User is already in db
    const emailExist = await User_1.default.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send('L\'email est déjà utilisé');
    //Hash passwords
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(req.body.password, salt);
    // Create New User 
    const user = new User_1.default({
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.status(201).send({ user });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
//LOGIN
router.post('/login', async (req, res) => {
    // Validate Data before we create user
    const { error } = validation_1.loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    //Check if email exist
    const user = await User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Cet email n\'existe pas !');
    //Check Password is correct
    //@ts-ignore
    const validPassword = await bcryptjs_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Le mot de passe est incorrect !');
    //Create and assign token
    //@ts-ignore
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: '24h'
    });
    res.header('auth-token', token).send({ user, token });
});
module.exports = router;
//# sourceMappingURL=auth.js.map