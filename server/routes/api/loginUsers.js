const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

// Load user model
const User = require('../../models/User');

// @route GET api/loginUsers/test
// @description tests login route
// @access Public
router.get('/test', (req, res) =>   res.json({ message: "Hello from login!" }));

// @route POST api/loginUsers/login
// @description login user
// @access Public
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
    // check if password or email is not empty, null or undefined
	if (!password || !email) {
		return res.status(400).json('no email or no password given');
	}
    try {
        const user = await User.findOne({ email });
        // If a user was found
        if (user) {
            const validPassword = bcrypt.compareSync(password, user.password);
            // user was found with its valid password
            if(validPassword){
                req.session.user = user;
                req.session.authorized = true;
                console.log(req.session)
                return res.status(200).json(user);
            }
            else {
                return res.status(400).json('invalid password');
            }
        }
        else {
            return res.status(400).json('could not find user in system');
        }
    }
    catch (error) {
        return res.status(400).json('something went wrong, user unable to login');
    }
});  

module.exports = router;
