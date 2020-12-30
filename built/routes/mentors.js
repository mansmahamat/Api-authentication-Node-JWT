"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const updateMentors_1 = __importDefault(require("../controllers/updateMentors"));
const deleteMentors_1 = __importDefault(require("../controllers/deleteMentors"));
const getOneMentors_1 = __importDefault(require("../controllers/getOneMentors"));
const Mentor_1 = __importDefault(require("../models/Mentor"));
const router = express_1.Router();
router.post('/mentors', async (req, res) => {
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
router.get('/mentor/:id', getOneMentors_1.default);
router.patch('/mentors/:id', updateMentors_1.default);
router.delete('/mentors/:id', deleteMentors_1.default);
module.exports = router;
//# sourceMappingURL=mentors.js.map