import { Request, Response } from 'express';
import { Router } from 'express';
import  updateMentors from '../controllers/updateMentors';
import  deleteMentors from '../controllers/deleteMentors';
import  getOneMentors from '../controllers/getOneMentors';
import  Mentor from '../models/Mentor';


const router = Router();

router.post('/mentors', async (req: Request, res:Response) => {
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

router.get('/mentors' ,async (req:Request, res: Response) => {
    
    
    try {
        const  fetchMentor = await Mentor.find({});
    res.status(200).send(fetchMentor)
    } catch (err) {
        res.status(400).send(err);
    } 
       
});

router.get('/mentor/:id',  getOneMentors)

router.patch('/mentors/:id', updateMentors)

router.delete('/mentors/:id', deleteMentors)




module.exports = router;