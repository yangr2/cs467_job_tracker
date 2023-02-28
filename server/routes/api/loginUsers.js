const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

// Load user model
const User = require('../../models/User');

// @route POST api/loginUsers/login
// @description login user
// @access Public
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
    // check if password or email is not empty, null or undefined
	if (!password || !email) {
		return res.status(401).json({message: 'No email or no password given'});
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

                // Add JWT to backend
                const token = jwt.sign(
                    { email: user.email, userId: user.id , userName: user.name },
                    "thisIsMySecret!",
                    { expiresIn: "1h" }
                );
                return res.status(200).json({
                    token: token,
                    expiresIn: 3600,
                    userId: user.id,
                    email: user.email,
                    userName: user.name,
                });
            }
            else {
                return res.status(401).json({message: "Incorrect password"});
            }
        }
        else {
            return res.status(401).json({message: 'Could not find user in system'});
        }
    }
    catch (error) {
        return res.status(500).json({message: 'something went wrong, user unable to login'});
    }
});  

module.exports = router;
