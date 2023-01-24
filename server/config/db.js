const mongoose = require('mongoose');
require('dotenv').config();
db = process.env.Mongo_URI    // Get the db connection url from env

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db, {
        useNewUrlParser: true,
        });

        console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
  
module.exports = connectDB;