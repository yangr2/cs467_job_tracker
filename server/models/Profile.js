const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    phone_number: {
        type: String,
        required: [true, 'Please enter your phone number']
    },

    website: {
        type: String,
    },  
    
    linkedIn: {
        type: String,
    },
    
    education: {
            school: {
                type: String,
                required: [true, 'Please enter your school name']
            },

            degree: {
                type: String,
                required: [true, 'Please enter your degree and field of study']
            },

            education_years: {
                type: String,
                required: [true, 'Please enter your school years']
            }
    },
    
    experience: {
            job_title: {
                type: String,
                required: [true, 'Please enter the job title']
            },
            company: {
                type: String,
                required: [true, 'Please enter the company name']
            },
            experience_years: {
                type: String,
                required: [true, 'Please enter years worked at company']
            },
            description: {
                type: String,
                required: [true, 'Please enter job description']
            }
    },

    skills: {
        type: String,
        required: [true, 'Please enter your relevant job skills']
    },

    user_id: {
        type: mongoose.Types.ObjectId, 
        required: true,
        ref: 'user'
    },

    name: {
        type: String
    }
    
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);