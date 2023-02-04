const mongoose = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

const UserSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please enter a valid name']
    }, 
    email: {
        type: String, 
        required: [true, 'Please enter a valid email'],
        lowercase: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: isEmail, 
            message: 'Invalid email', 
            isAsync: false
        }
    }, 
    password: {
        type: String,
        required: [true, 'Please enter a valid password']
    },
})

module.exports = User = mongoose.model('user', UserSchema);