const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// load Profile and User models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// get user information by given request token
const authUser = (req) => {
    const privateKey = "thisIsMySecret!";
    const token = req.headers['authorization'];
    if (typeof token !=='undefined') {
        return jwt.verify(token, privateKey, function (err,data){
        if(!(err && typeof data === 'undefined')) {
            return {
                loggedIn: true,
                userId: data.userId,
                email: data.email,
                name: data.name,
            };
        } else {
            return {loggedIn: false};
        }
        })
    } else {
        return {loggedIn: false};
    } 
}

// basic validation for request data
const validateRequestData = (req) => {
    // check if request containes all required fields
    if (!req.body.phone_number) {
        return {isValid:false, message: "Missing phone number"};
    } else if (!req.body.skills) {
        return {isValid:false, message: "Missing skills"};
    } else if (!req.body.education.school) {
        return {isValid:false, message: "Missing school name"};
    } else if (!req.body.education.degree) {
        return {isValid:false, message: "Missing degree and field of study"};
    } else if (!req.body.education.education_years) {
        return {isValid:false, message: "Missing education years"};
    } else if (!req.body.experience.job_title) {
        return {isValid:false, message: "Missing job title"};
    } else if (!req.body.experience.company) {
        return {isValid:false, message: "Missing company name"};
    } else if (!req.body.experience.experience_years) {
        return {isValid:false, message: "Missing job years"};
    } else if (!req.body.experience.description) {
        return {isValid:false, message: "Missing job description"};
    } 
    
    return {isValid:true};
}


// @route GET api/profile/:user_id
// @description Get profile for a single user id
// @access private
router.get('/:user_id', async (req, res) => {
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        // Skip token check for now until front end finish
        //return res.status(401).json({ message: "Request Unauthorize"});
    }
    try {
        const profile = await Profile.find({'user_id': req.params.user_id})
        res.json(profile);

    } catch (error) {
        res.status(500).json({ error: "Could not get job position details" });
    }
});

// @route POST api/profile/:user_id
// @description POST profile details by user_id
// @access private
router.post('/:user_id', async (req, res) => {
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        // Skip token check for now until front end finish
        //return res.status(401).json({ message: "Request Unauthorize"});
    } 
    
    // check if request containes all required fields
    try {
        const validateResult = validateRequestData(req);
        if (!validateResult.isValid) {
            return res.status(401).json({ message: validateResult.message});
        }
        
        // Assign user id to body
        const body = req.body;
        body.user_id = req.params.user_id;
        
        // Check if user profile already exists
        const exist = await Profile.findOne({'user_id': req.params.user_id});
        if (exist) {
            return res.status(401).json({ message: "Profile already exists."});
        }

        // create new profile
        const newProfile = await Profile.create(body)
        User.findById(req.params.user_id, function(err,docs){
            if(err){
                console.log(err)
            }else{
              newProfile.name = docs.name
              newProfile.save()
              res.status(200).json(newProfile);
            }
        })
    
    }catch (error) {
        res.status(500).json({ message: "Profile creation failed!"});
    }
});

// @route PUT api/profile/:user_id/:id
// @description edit profile details by id
// @access private
router.put('/:user_id/:id', async (req, res) => {
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        // Skip token check for now until front end finish
       // return res.status(401).json({ message: "Request Unauthorize"});
    }
    try {
        const validateResult = validateRequestData(req);
        if (!validateResult.isValid) {
            return res.status(401).json({ message: validateResult.message});
        }
        // Assign user id to body
        const body = req.body;
        body.user_id = req.params.user_id;
        body._id = req.params.id

        // Error Validation checking
        if(!mongoose.Types.ObjectId.isValid(body.user_id)){
            return res.status(404).json({message: 'Error: User does not exist'})
        }

        if(!mongoose.Types.ObjectId.isValid(body._id)){
            return res.status(404).json({message: 'Error: Profile does not exist'})
        }

        // Add profile id in for check profile is exist or not
        const checkExitBody = {};
        checkExitBody._id = req.params.id;
        checkExitBody.user_id = req.params.user_id;

       
        let result = await Profile.findOneAndReplace({_id: req.params.id}, body);
    
        // update user's name in User Model
        // User.findById(req.params.user_id, function(err,docs){
        //     if(err){
        //         console.log(err)
        //     }else{
        //         docs.name = body.name;
        //         docs.save()
        //     }
        // })
        res.status(200).json({message: 'Profile Updated Successfully!'});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;