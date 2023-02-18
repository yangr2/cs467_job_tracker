const mongoose = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

const ContactSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please enter the first name of the contact']
  },

  last_name: {
    type: String,
    required: [true, 'Please enter the last name of the contact']
  },

  company: {
    type: String, 
    required: [true, 'Please enter the company name of this contact']
  },

  phone: {
    type: String
  },

  email: {
    type: String, 
    lowercase: true,
    minlength: 5,
    validate: {
        validator: isEmail, 
        message: 'Invalid email', 
        isAsync: false
    }
  },

  linkedin: {
    type: String
  },

  twitter: {
    type: String
  },

  user_id: {
    type: mongoose.Types.ObjectId, 
    required: true,
    ref: 'user'
  }
});

module.exports = Contact = mongoose.model('contact', ContactSchema);