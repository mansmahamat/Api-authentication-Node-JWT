const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

//Import Route
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const mentors = require('./routes/mentors');

dotenv.config();

//Connect Db
mongoose.connect(
    process.env.DB_CONNECT,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  },
() => console.log('DB connected '))

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('uploads'))
app.use(cors());

// Route middlewware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api', mentors);


app.listen(process.env.PORT || 5000, () => console.log('App is here'));
