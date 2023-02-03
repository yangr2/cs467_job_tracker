const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');

// @route GET api/registerUsers/test
// @description tests register route
// @access Public
router.get('/test', (req, res) =>   res.json({ message: "Hi this is the register users server!" }));

// @route POST api/registerUsers/register
// @description add/save user
// @access Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(400).json({ message: "User already exists."});

        const hiddenPassword = await bcrypt.hash(password, 12); 

        const newUser = await User.create({ name, email, password: hiddenPassword });

        res.status(200).json({ message: "User registration successful!" })

    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json(Object.values(error.errors).map(val => val.message));
        }
        else {
            res.status(500).json({ message: 'Error: User was not able to register.' });

        }
    }

});


module.exports = router;