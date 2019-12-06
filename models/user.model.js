const mongoose = require('mongoose');
const Joi = require('joi');
const {gameSchema} = require('../models/game.model');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 3,
        required: true
    },
    phone: {
        type: String,
        maxlength: 50,
        minlength: 3,
        required: true
    },
    username: {
        type: String,
        maxlength: 50,
        minlength: 3,
        required: true
    },
    password: {
        type: String,
        maxlength: 255,
        minlength: 3,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: {
        type: [gameSchema]
    }
});

const User = mongoose.model('users', userSchema);

validateUser = (user) => {
    const Schema = {
        name: Joi.string().max(50).min(3).required(),
        phone: Joi.string().max(50).min(3).required(),
        username: Joi.string().max(50).min(3).required(),
        password: Joi.string().max(250).min(3).required(),
        isAdmin: Joi.boolean(),
        cart:  Joi.array().items(Joi.required())
    }

    return Joi.validate(user, Schema);
};


module.exports.User = User;
module.exports.validate = validateUser;