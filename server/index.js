const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');

// routes
const registerUsers = require('./routes/api/registerUsers');
const loginUsers = require('./routes/api/loginUsers');
const userInfo = require('./routes/api/userInfo');
const profile = require('./routes/api/profile');

const jobs = require('./routes/api/jobs');


const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(session({
  secret: 'thisIsMySecret!',
  saveUninitialized: false,
  cookie: {
    sameSite: 'strict'
  }
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// use Routes
app.use('/api/registerUsers', registerUsers);
app.use('/api/loginUsers', loginUsers);
app.use('/api/userInfo', userInfo);
app.use('/api/jobs', jobs);
app.use('/api/profile', profile)

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
