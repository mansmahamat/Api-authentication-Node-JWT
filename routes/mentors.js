const router = require('express').Router();
const dotenv = require('dotenv');
const updateMentors = require('../controllers/updateMentors');
const deleteMentors = require('../controllers/deleteMentors');
const getOneMentors = require('../controllers/getOneMentors');

const Mentor = require('../models/Mentor');

const multer = require('multer')
dotenv.config();

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads');
    },
    filename: function(req,file,cb){
        cb(null,  file.originalname)
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'images/jpg' || file.mimetype === 'images/jpeg' || file.mimetype === 'images/png' ){
        cb(null, true);
    } else {
        cb(null, false);
    }        
};



const upload = multer({storage: storage} )
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})




router.post('/mentors', upload.single('avatar') , async (req, res) => {
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

router.get('/mentors' ,async (req, res) => {
    
    
    try {
        const  fetchMentor = await Mentor.find({});
    res.status(200).send(fetchMentor)
    } catch (err) {
        res.status(400).send(err);
    } 
       
});

router.get('/mentor/:id',  getOneMentors.findOne)

router.patch('/mentors/:id', upload.single('avatar'),(req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Remplissez les champs pour une modification"
        });
      }
    
      const id = req.params.id;
    
    
      Mentor.findByIdAndUpdate(id, {
        $set: {
          firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.file.path,
        //avatar: req.body.avatar,
        title: req.body.title,
        disponible: req.body.disponible,
        presentation: req.body.presentation,
        technos: req.body.technos,
        socials: req.body.socials,
        userId: req.body.userId
        }
      }, { useFindAndModify: false })
        .then(result => {
          if (!result) {
            res.status(404).send({
              message: `Ce Mentor n'existe pas`
            });
          } else res.send({ message: "Profil mis à jour" });
        })
        .catch(err => {
          res.status(500).send({
            err
          });
        });
})

router.delete('/mentors/:id', deleteMentors.delete)




module.exports = router;