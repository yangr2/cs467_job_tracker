const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

// Load user model
const User = require('../../models/User');

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

// @route GET api/user/:user_id
// @description Get user info for a single user id
// @access private
router.get('/:user_id', async (req, res) => {
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        // Skip token check for now until front end finish
        //return res.status(401).json({ message: "Request Unauthorize"});
    }
    try {
        const user = await User.find({'_id': req.params.user_id})
        res.json(user);

    } catch (error) {
        res.status(500).json({ error: "Could not get user info details" });
    }
});


module.exports = router;