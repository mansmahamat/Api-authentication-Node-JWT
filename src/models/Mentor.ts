import mongoose, { Schema, model } from 'mongoose';

const mentorSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    lastName: {
        type: String,
        required: true,
        max: 100,
        min: 6
    },
    avatar: {
        type: String,
        required: true,
        //max: 1024,
        //min: 6
    },
    title: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    presentation: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    technos: {
        type: Array,
        required: false,
        max: 1024,
        min: 6
    },
    socials: {
        type: Array,
        required: false,
        max: 1024,
        min: 6
    },
    userId: {
        type: String,
        required: false,
        max: 1024,
        min: 6
    },
    disponible: {
        type: String,
        required: false,
        max: 1024,
        min: 6
    },
    cloudinary_id : {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Mentor', mentorSchema);