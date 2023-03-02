const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Load Contact Position model
const Contact = require('../../models/Contact');

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
            };
        } else {
            return {loggedIn: false};
        }
        })
    } else {
        return {loggedIn: false};
    } 
}

// basic validation for request data
const validateRequestData = (req) => {
    // check if request containes all required fields
    if (!req.body.first_name) {
        return {isValid:false, message: "Missing first name field."};
    } else if (!req.body.last_name) {
        return {isValid:false, message: "Missing last name field."};
    } else if (!req.body.company) {
        return {isValid:false, message: "Missing company name field."};
    }

    // Check if the email is valid when a user input it.
    if (req.body.email) {
        if (req.body.email.length < 5 || !req.body.email.includes('@')) {
            return {isValid:false, message: "Email is invalid."};
        }
    }

    return {isValid:true};
}

// @route GET api/contacts/:user_id
// @description Get all contacts for a single user id
// @access private
router.get('/:user_id', async (req, res) => {
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        return res.status(401).json({ message: "Request Unauthorize"});
    }
    try {
        const contactList  = await Contact.find({ 'user_id': req.params.user_id })
        res.json(contactList);

    } catch (error) {
        res.status(500).json({ error: "Could not get contact details" });
    }
});

// @route GET api/contacts/:user_id/:contact_id
// @description Get single contact details by id
// @access private
router.get('/:user_id/:contact_id', async (req, res) => {
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        return res.status(401).json({ message: "Request Unauthorize"});
    }
    try {
        const contact = await Contact.findOne({
            'user_id': req.params.user_id, 
            '_id': req.params.contact_id 
        })
        res.json(contact);

    } catch (error) {
        res.status(500).json({ error: "Could not get contact details" });
    }
});

// @route POST api/contacts/:user_id
// @description POST single contact details by user_id
// @access private
router.post('/:user_id', async (req, res) => {
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        return res.status(401).json({ message: "Request Unauthorize"});
    }
    // check if request containes all required fields
    try {
        const validateResult = validateRequestData(req);
        if (!validateResult.isValid) {
            return res.status(401).json({ message: validateResult.message});
        }
        // Assign user id to body
        const body = req.body;
        body.user_id = req.params.user_id;

        const exist = await Contact.findOne(body);
        if (exist) {
            return res.status(401).json({ message: "Contact Existed!!."});
        }

        // creat new contact
        const newContact = await Contact.create(body)
        res.status(200).json(newContact);

    }catch (error) {
        res.status(500).json({ message: "Contact creation failed!"});
    }
});

// @route PUT api/contacts/:user_id/:contact_id
// @description edit single contact details by contact_id
// @access private
router.put('/:user_id/:contact_id', async (req, res) => {
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        return res.status(401).json({ message: "Request Unauthorize"});
    }
    try {
        const validateResult = validateRequestData(req);
        if (!validateResult.isValid) {
            return res.status(401).json({ message: validateResult.message});
        }
        
        // Add contact id in for check contact is exist or not
        const checkExistBody = {};
        checkExistBody._id = req.params.contact_id;
        checkExistBody.user_id = req.params.user_id;

        const exist_1 = await Contact.findOne(checkExistBody);
        if (!exist_1) {
            return res.status(401).json({ message: "Contact Does Not Existed!!."});
        }

        // Assign user id to body
        const body = req.body;
        body.user_id = req.params.user_id;

        // Check if same contact exist.
        const exist_2 = await Contact.findOne(body);
        if (exist_2 && exist_2._id.toString() != req.params.contact_id) {
            return res.status(401).json({ message: "Contact Existed!!."});
        }

        let result = await Contact.findOneAndReplace({_id: req.params.contact_id}, body);
        res.status(200).json({message: 'Contact Update Successfully!'});
    } catch (error) {
        res.status(500).json(error);
    }
});

// @route DELETE api/contacts/:user_id/:contact_id
// @description delete single contact details by id
// @access private
router.delete('/:user_id/:contact_id', async (req, res) => {
    const authData = authUser(req);
    if (!authData.loggedIn || authData.userId !== req.params.user_id) {
        return res.status(401).json({ message: "Request Unauthorize"});
    }
    try {
        let result = await Contact.findByIdAndRemove(req.params.contact_id);
        if (result) {
            res.status(200).json({ message: "Contact deleted successfully!"});
        } else {
            res.status(500).json({ message: "Contact does not exist"});
        }
    } catch (error) {
        res.status(500).json({ message: "Contact delete failed!"});
    }
});

module.exports = router;