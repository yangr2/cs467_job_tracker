const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const positions = require('./routes/api/positions');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// use Routes
app.use('/api/positions', positions);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
