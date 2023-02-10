const express = require('express');
const router = express.Router();

// Load Job Position model
const Job = require('../../models/Job');

// @route GET api/jobDetails/test
// @description tests job position details route
// @access Public
router.get('/test', (req, res) =>   res.json({ message: "Hi! This is the page for all of a user's saved jobs!" }));


// @route GET api/jobDetails/:id
// @description Get single job position details by id
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const jobList  = await Job.find({ 'user_id': req.params.id })
        res.json(jobList);

    } catch (error) {
        res.status(500).json({ error: "Could not get job position details" });
    }
});


module.exports = router;