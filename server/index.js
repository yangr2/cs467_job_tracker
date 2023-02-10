const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const positions = require('./routes/api/positions');

const registerUsers = require('./routes/api/registerUsers');

const jobs = require('./routes/api/jobs');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// use Routes
app.use('/api/positions', positions);

app.use('/api/registerUsers', registerUsers);

app.use('/api/jobs', jobs);

// app.use('api/jobDetails', jobDetails)

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
