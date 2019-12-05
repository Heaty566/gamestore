const {User} = require('../models/user.model');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');

const  express = require('express');
const router = express.Router();

router.post("/login", async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne(_.pick(req.body, ["username"]));
    const validatePassword = await bcrypt.compare(req.body.password, user.password);

    

    if (!validatePassword) return res.status(400).send("Invalid username or password");
    const token = await getToken(_.pick(user, ["_id", "isAdmin"]));
   
    res.header("x-auth-token", token).send(`login successfully`);
});


getToken = (value) => {
    const token = jwt.sign({_id: value._id, isAdmin: value.isAdmin}, config.get("myKey"));
    return token;
}

validate = (login) => {
    const Schema = {
        username: Joi.string().max(50).min(3).required(),
        password: Joi.string().max(255).min(3).required()
    };

    return Joi.validate(login, Schema);
};

module.exports = router;