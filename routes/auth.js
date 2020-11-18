const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../routes/validation');




router.post('/register', async (req,res) => {
     // Validate Data before we create user
    const {error} = registerValidation(req.body);
   
    if (error) return res.status(400).send(error.details[0].message);

    //Check if User is already in db
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

   // Create New User 
   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.status(201).send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    } 
});

module.exports = router;