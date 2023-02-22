const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// Load Job Position model
const Job = require('../../models/Job');

// function to validate date format
const dateIsValid = (date) => {
    return date instanceof Date && !isNaN(date);
}

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
    if (!req.body.job_title) {
        return {isValid:false, message: "Missing job title field."};
    } else if (!req.body.company) {
        return {isValid:false, message: "Missing company field."};
    } else if (!req.body.job_type) {
        return {isValid:false, message: "Missing job type field."};
    } else if (!req.body.location) {
        return {isValid:false, message: "Missing location field."};
    } else if (!req.body.application_date) {
        return {isValid:false, message: "Missing application date field."};
    } else if (!req.body.skills) {
        return {isValid:false, message: "Missing skills field."};
    } else if (!req.body.status) {
        return {isValid:false, message: "Missing status field."};
    }

    // Given a basic check for application_date format
    if (!dateIsValid(new Date(req.body.application_date))) {
        return {isValid:false, message: "Application date field format incorrect."};
    }
    return {isValid:true};
}

// @route GET api/jobs/:user_id
// @description Get all job positions for a single user id
// @access private
router.get('/:user_id', async (req, res) => {
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        // Skip token check for now until front end finish
        return res.status(401).json({ message: "Request Unauthorize"});
    }
    try {
        const jobList  = await Job.find({ 'user_id': req.params.user_id })
        res.json(jobList);

    } catch (error) {
        res.status(500).json({ error: "Could not get job position details" });
    }
});

// @route GET api/jobs/:user_id/:id
// @description Get single job position details by id
// @access private
router.get('/:user_id/:id', async (req, res) => {
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        // Skip token check for now until front end finish
        return res.status(401).json({ message: "Request Unauthorize"});
    }
    try {
        const job = await Job.findOne({
            'user_id': req.params.user_id, 
            '_id': req.params.id 
        })
        res.json(job);

    } catch (error) {
        res.status(500).json({ error: "Could not get job position details" });
    }
});

// @route POST api/jobs/:user_id
// @description POST single job position details by user_id
// @access private
router.post('/:user_id', async (req, res) => {
    
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        // Skip token check for now until front end finish
        return res.status(401).json({ message: "Request Unauthorize"});
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
        
        const exist = await Job.findOne(body);
        if (exist) {
            return res.status(401).json({ message: "Job Existed!!."});
        }

        // creat new job
        const newJob = await Job.create(body)
        res.status(200).json(newJob);

    }catch (error) {
        res.status(500).json({ message: "Job creation failed!"});
    }
});

// @route DELETE api/jobs/:user_id/:id
// @description delete single job position details by id
// @access private
router.delete('/:user_id/:id', async (req, res) => {
    
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        // Skip token check for now until front end finish
        return res.status(401).json({ message: "Request Unauthorize"});
    }
    try {
        let result = await Job.findByIdAndRemove(req.params.id);
        if (result) {
            res.status(200).json({ message: "Job deleted successfully!"});
        } else {
            res.status(500).json({ message: "Job does not exist"});
        }
    } catch (error) {
        res.status(500).json({ message: "Job delete failed!"});
    }
});

// @route PUT api/jobs/:user_id/:id
// @description edit single job position details by id
// @access private
router.put('/:user_id/:id', async (req, res) => {
    
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        // Skip token check for now until front end finish
        return res.status(401).json({ message: "Request Unauthorize"});
    }
    try {
        const validateResult = validateRequestData(req);
        if (!validateResult.isValid) {
            return res.status(401).json({ message: validateResult.message});
        }
        // Assign user id to body
        const body = req.body;
        body.user_id = req.params.user_id;

        // Add job id in for check job is exist or not
        const checkExitBody = {};
        checkExitBody._id = req.params.id;
        checkExitBody.user_id = req.params.user_id;

        const exist = await Job.findOne(checkExitBody);
        if (!exist) {
            return res.status(401).json({ message: "Job Does Not Existed!!."});
        }

        let result = await Job.findOneAndReplace({_id: req.params.id}, body);
        res.status(200).json({message: 'Job Update Successfully!'});
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;