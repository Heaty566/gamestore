const _ = require('lodash');
const bcrypt = require('bcrypt');

const {User, validate} = require('../models/user.model');
const auth = require('../middleware/auth-user');


const express = require('express');
const router = express.Router();

router.post("/register", async (req, res) => {    
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = new User(_.pick(req.body, ["name", "phone", "username"]));

    const salt = await bcrypt.genSalt(4);
    user.password = await bcrypt.hash(req.body.password, salt);

    user = await user.save();
   
    res.send(_.pick(user, ["name", "phone", "username"]));
});



module.exports = router;