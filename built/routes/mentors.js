"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deleteMentors_1 = __importDefault(require("../controllers/deleteMentors"));
const Mentor_1 = __importDefault(require("../models/Mentor"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer = require('multer');
dotenv_1.default.config();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    }
    else {
        cb(new Error('Mauvais format'), false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
});
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const router = express_1.Router();
router.post('/mentors', upload.single('avatar'), async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const mentor = new Mentor_1.default({
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
        res.status(201).send({ mentor: mentor._id });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.get('/mentors', async (req, res) => {
    try {
        const fetchMentor = await Mentor_1.default.find({});
        res.status(200).send(fetchMentor);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.get('/mentor/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const fetchMentor = await Mentor_1.default.findById(id);
        res.status(200).send(fetchMentor);
    }
    catch (error) {
        res.status(404).send(error + "00");
    }
});
router.put('/mentors/:id', upload.single('avatar'), async (req, res) => {
    const id = req.params.id;
    let mentor = await Mentor_1.default.findById(id);
    // Delete image from cloudinary
    // @ts-ignore
    await cloudinary.uploader.destroy(mentor.cloudinary_id);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
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
    try {
        res.send('ooooooooook');
    }
    catch (err) {
        res.status(400).send(err + "Une erreur");
    }
});
router.delete('/mentors/:id', deleteMentors_1.default);
module.exports = router;
//# sourceMappingURL=mentors.js.map