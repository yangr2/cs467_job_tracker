const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');

// Constant for minimum password length 
const minlength = 5; 

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
        if (!email || !name || !password || password.length < minlength) {
            return res.status(401).json({ message: "Missing required field(s) or Password less than 5 characters"})
        }

        const userExists = await User.findOne({ email });

        if (userExists) return res.status(401).json({ message: "User already exists."});

        const hiddenPassword = await bcrypt.hash(password, 12); 

        const newUser = await User.create({ name, email, password: hiddenPassword });

        res.status(200).json({ name, email, password, message: "User registration successful!" })

    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(401).json(Object.values(error.errors).map(val => val.message));
        }
        else {
            res.status(500).json({ message: 'Error: User was not able to register.' });

        }
    }

});


module.exports = router;