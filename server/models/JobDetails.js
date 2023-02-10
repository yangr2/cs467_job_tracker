const mongoose = require('mongoose');
const validator = require('validator');

const JobDetailsSchema = new mongoose.Schema({
  position_name: {
    type: String,
    required: [true, 'Please enter a name for the job position']
  },

  description: {
    type: String,
  },

  application_date: {
    type: String,
  },

  status: {
    type: String
  },

  user_id: {
    type: mongoose.Types.ObjectId, 
    required: true,
    ref: 'user'
  },

  company: {
    type: String,
    required: [true, 'Please enter the company name']
  },

  skill_list: [{
    skill_name: [{
        type: String,
        required: [true, 'Please enter the skill name']
    }],
    required_level: {
        type: String,
        required: [true, 'Level is required']
    }
  }]

});

module.exports = JobDetails = mongoose.model('jobDetails', JobDetailsSchema);