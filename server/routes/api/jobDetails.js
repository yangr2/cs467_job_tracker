const express = require('express');
const router = express.Router();

// Load Job Position model
const JobDetails = require('../../models/JobDetails');

// @route GET api/jobDetails/test
// @description tests job position details route
// @access Public
router.get('/test', (req, res) =>   res.json({ message: "Hi! This is the job details page!" }));


/*
// @route GET api/jobDetails/position
// @description Get details of job position
// @access Public
router.get('/', (req, res) => {
  Position.find()
    .then(positions => res.json(positions))
    .catch(err => res.status(404).json({ nopositionsfound: 'No Positions found' }));
});
*/



// @route GET api/jobDetails/:id
// @description Get single job position details by id
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const jobPosition  = await JobDetails.findById(req.params.id);
        res.json(jobPosition);

    } catch (error) {
        res.status(500).json({ error: "Could not get job position details" });
    }
});

// @route POST api/jobDetails/:id
// @description add/save job position details by id
// @access Public
router.post('/:id', async (req, res) => {
    try {
        const jobPosition = await JobDetails.create(req.body);
        res.json(jobPosition);
    } catch (error) {
        res.status(400).json({ error: "Could not post job details" });
    }
});

// @route UPDATE api/jobDetails/:id
// @description update job position details by id
// @access Public
router.patch('/:id', async (req, res) => {
    try {
        const jobPosition = await JobDetails.findByIdAndUpdate(req.params.id, req.body);
        await jobPosition.save();
        res.json(jobPosition);
    } catch (error) {
        res.status(500).json({ error: "Could not update job details" });
    }
});


// @route DELETE api/jobDetails/:id
// @description Delete job position details by id
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        const jobPosition = await JobDetails.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Successfully deleted job position details!" });
    } catch (error) {
        res.status(500).json({ error: "Could not delete job details "})
    }
});

module.exports = router;