const express = require('express');
const router = express.Router();

// Load Position model
const Position = require('../../models/Position');

// @route GET api/positions/test
// @description tests positions route
// @access Public
router.get('/test', (req, res) =>   res.json({ message: "Hello from server!" }));

// @route GET api/positions
// @description Get all positions
// @access Public
router.get('/', (req, res) => {
  Position.find()
    .then(positions => res.json(positions))
    .catch(err => res.status(404).json({ nopositionsfound: 'No Positions found' }));
});

// @route GET api/positions/:id
// @description Get single position by id
// @access Public
router.get('/:id', (req, res) => {
  Position.findById(req.params.id)
    .then(position => res.json(position))
    .catch(err => res.status(404).json({ nopositionfound: 'No Position found' }));
});

// @route POST api/positions
// @description add/save position
// @access Public
router.post('/', (req, res) => {
  Position.create(req.body)
    .then(position => res.json({ msg: 'Position added successfully' }))
    .catch(err => res.status(400).json({ error: err }));
});

// @route DELETE api/positions/:id
// @description Delete position by id
// @access Public
router.delete('/:id', (req, res) => {
  Position.findByIdAndRemove(req.params.id, req.body)
    .then(position => res.json({ mgs: 'Position entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a position' }));
});

module.exports = router;