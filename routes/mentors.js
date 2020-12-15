const router = require('express').Router();
const updateMentors = require('../controllers/updateMentors');
const deleteMentors = require('../controllers/deleteMentors');
const getOneMentors = require('../controllers/getOneMentors');
const Mentor = require('../models/Mentor');
const verifyToken = require('./verifyToken');



router.post('/mentors', async (req, res) => {
    const mentor = new Mentor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        title: req.body.title,
        disponible: req.body.disponible,
        presentation: req.body.presentation,
        technos: req.body.technos,
        socials: req.body.socials,
        userId: req.body.userId


      });
      try {
          const savedMentor = await mentor.save();
          res.status(201).send({mentor: mentor._id});
      } catch (err) {
          res.status(400).send(err);
      } 
  });

router.get('/mentors' ,async (req, res) => {
    
    
    try {
        const  fetchMentor = await Mentor.find({});
    res.status(200).send(fetchMentor)
    } catch (err) {
        res.status(400).send(err);
    } 
       
});

router.get('/mentor/:id',  getOneMentors.findOne)

router.patch('/mentors/:id', updateMentors.update)

router.delete('/mentors/:id', deleteMentors.delete)




module.exports = router;