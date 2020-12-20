const router = require('express').Router();
const updateMentors = require('../controllers/updateMentors');
const deleteMentors = require('../controllers/deleteMentors');
const getOneMentors = require('../controllers/getOneMentors');

const Mentor = require('../models/Mentor');

const multer = require('multer')

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





router.post('/mentors', upload.single('avatar') , async (req, res) => {

    const mentor = new Mentor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.file.filename,
        //avatar: req.body.avatar,
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

router.patch('/mentors/:id', async (req, res) => {
    try {
		const mentor = await Mentor.findOne({ _id: req.params.id })

		if (req.body.firstName) {
			mentor.firstName = req.body.firstName
        }
        if (req.body.lastName) {
			mentor.lastName = req.body.lastName
        }
        if (req.body.avatar) {
			mentor.avatar = req.body.avatar
		}

		if (req.body.title) {
			mentor.title = req.body.title
        }
        if (req.body.disponible) {
			mentor.disponible = req.body.disponible
        }
        if (req.body.presentation) {
			mentor.presentation = req.body.presentation
        }
        if (req.body.technos) {
			mentor.technos = req.body.technos
        }
        if (req.body.socials) {
			mentor.socials = req.body.socials
        }
        if (req.body.userId) {
			mentor.userId = req.body.userId
		}

		await mentor.save()
		res.send(mentor)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}

})

router.delete('/mentors/:id', deleteMentors.delete)




module.exports = router;