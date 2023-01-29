const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String,
        required: true
    },

    /*
    id: {
        type: String
    }
    */

})

module.exports = User = mongoose.model('user', UserSchema);