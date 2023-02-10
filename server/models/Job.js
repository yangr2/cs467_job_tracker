const mongoose = require('mongoose');
const validator = require('validator');

const JobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: [true, 'Please enter a name for the job position']
  },

  company: {
    type: String,
    required: [true, 'Please enter the company name']
  },

  job_type: {
    type: String, 
    required: [true, 'Please enter the job type']
  },

  location: {
    type: String, 
    required: [true, 'Please enter the location']
  },

  application_date: {
    type: String, 
    required: [true, 'Please enter the application date']
  },

  skills: {
    type: String, 
    required: [true, 'Please enter skills required for this job']
  },

  status: {
    type: String,
    required: [true, 'Please enter the status of this job']
  },

  user_id: {
    type: mongoose.Types.ObjectId, 
    required: true,
    ref: 'user'
  },

});

module.exports = Job = mongoose.model('job', JobSchema);