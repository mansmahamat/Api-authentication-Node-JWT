import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv';

//Import Route
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const mentors = require('./routes/mentors');

const app = express();

dotenv.config();



//Connect Db
mongoose.connect(
  
    process.env.DB_CONNECT!,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err : Error)=> console.log(err))

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Route middlewware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api', mentors);


app.listen(process.env.PORT || 5000, () => console.log('App is here'));