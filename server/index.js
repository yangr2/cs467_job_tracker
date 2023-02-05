const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const positions = require('./routes/api/positions');

const registerUsers = require('./routes/api/registerUsers');

const loginUsers = require('./routes/api/loginUsers');

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

app.use('/api/loginUsers', loginUsers);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
