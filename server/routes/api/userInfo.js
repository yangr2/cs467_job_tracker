const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/auth', async (req, res) => {
  const privateKey = "thisIsMySecret!";
  const token = req.headers['authorization'];
  if (typeof token !=='undefined') {
      jwt.verify(token, privateKey, function (err,data){
      if(!(err && typeof data === 'undefined')) {
        return res.status(200).json({
            loggedIn: true,
            userId: data.userId,
            email: data.email,
            userName: data.userName,
        });
      } else {
        return res.status(200).json({
          loggedIn: false
        });
      }
    })
  } else {
    return res.status(200).json({
      loggedIn: false
    });
  } 
});

module.exports = router;