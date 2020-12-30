import { Request, Response } from 'express';
import { Router } from 'express';
import  updateMentors from '../controllers/updateMentors';
import  deleteMentors from '../controllers/deleteMentors';
import  getOneMentors from '../controllers/getOneMentors';
import  Mentor from '../models/Mentor';
import dotenv from 'dotenv';


const multer = require('multer')
dotenv.config();

const storage = multer.diskStorage({
    destination: function(req:Request,file: Express.Multer.File ,cb: (error: Error | null, destination: string) => void){
        cb(null, './uploads');
    },
    filename: function(req:Request,file: Express.Multer.File ,cb: (error: Error | null, destination: string) => void){
        cb(null,  file.originalname)
    }
});


const fileFilter = (req:Request,file: Express.Multer.File ,cb: (error: Error | null, destination: boolean) => void) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg')  {
      cb(null, true);
  } else {
      cb(new Error('Mauvais format'), false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }
})
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})


const router = Router();


router.post('/mentors', upload.single('avatar') , async (req: Request, res: Response) => {
  const result = await  cloudinary.uploader.upload(req.file.path)
    const mentor = new Mentor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: result.secure_url,
        //avatar: req.body.avatar,
        title: req.body.title,
        disponible: req.body.disponible,
        presentation: req.body.presentation,
        technos: req.body.technos,
        socials: req.body.socials,
        userId: req.body.userId,
        cloudinary_id: result.public_id,
    


      });
      try {
          const savedMentor = await mentor.save();
          // SEND FILE TO CLOUDINARY
   

  
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

router.get('/mentor/:id',  async (req:Request, res: Response) => {
  try {
    const id = req.params.id;
  
   const fetchMentor= await Mentor.findById(id)
    res.status(200).send(fetchMentor)
  } catch (error) {
    res.status(404).send(error + "00");
  }
})

router.patch('/mentors/:id', upload.single('avatar'),async (req:Request, res:Response) => {
  
      try {
        const id = req.params.id;
        let mentor = await Mentor.findById(id);
        // Delete image from cloudinary
        //@ts-ignore
        await cloudinary.uploader.destroy(mentor.cloudinary_id);
        // Upload image to cloudinary
        const result = await  cloudinary.uploader.upload(req.file.path)
     
      const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: result.secure_url,
        //avatar: req.body.avatar,
        title: req.body.title,
        disponible: req.body.disponible,
        presentation: req.body.presentation,
        technos: req.body.technos,
        socials: req.body.socials,
        userId: req.body.userId,

      };
        const user = await Mentor.findByIdAndUpdate(id, data, {
          useFindAndModify: false
          });
        // SEND FILE TO CLOUDINARY
 


        res.json(user);
    } catch (err) {
        res.status(400).send(err + "Une erreur");
    } 
    
    
      
})

router.delete('/mentors/:id', deleteMentors)




module.exports = router;