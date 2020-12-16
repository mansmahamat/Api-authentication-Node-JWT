import { Request, Response } from 'express';
import { Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {registerValidation, loginValidation} from '../routes/validation';

const router = Router();


router.post('/register', async (req: Request,res:Response) => {
     // Validate Data before we create user
    const {error} = registerValidation(req.body);
   
    if (error) return res.status(400).send(error.details[0].message);

    //Check if User is already in db
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('L\'email est déjà utilisé');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

   // Create New User 
   const user = new User({
      email: req.body.email,
      password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.status(201).send({user});
    } catch (err) {
        res.status(400).send(err);
    } 
});

//LOGIN
router.post('/login', async (req: Request, res: Response) => {
    // Validate Data before we create user
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if email exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Cet email n\'existe pas !');

    //Check Password is correct
    //@ts-ignore
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Le mot de passe est incorrect !');

    //Create and assign token
    //@ts-ignore
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {
        expiresIn : '24h'
    });
    res.header('auth-token', token).send({user, token})
});

module.exports = router;