//import bcrypt from 'bcryptjs';
//import jwt from 'jsonwebtoken';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');

// @route GET api/register/test
// @description tests register route
// @access Public
router.get('/test', (req, res) =>   res.json({ message: "Hi this is the register users server!" }));

// @route POST api/register
// @description add/save user
// @access Public
router.post('/register', async (req, res) => {
    const { name, email, password, checkPassword} = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(400).json({ message: "User already exists."});

        //if (password !== checkPassword) return res.status(400).json({ message: "Passwords do not match."})

        const hiddenPassword = await bcrypt.hash(password, 12); 

        const newUser = await User.create({ name, email, password: hiddenPassword });

        // const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: "6h "});

        // res.status(200).json({ newUser, token});

        res.status(200).json({ message: "User registration successful!" })

    } catch (error) {
        res.status(500).json({ message: 'Error: User was not able to register.' });
    }








});


module.exports = router;