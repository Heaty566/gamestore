const mongoose = require('mongoose');
const Joi = require('joi');

const {genreSchema} = require("./genre.model");

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 3,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        min: 0,
        max: 1000,
        default: 0
    },
    genre: {
        type: genreSchema
    }
});

const Game = mongoose.model("games", gameSchema);

validateGame = (game) => {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        isPublished: Joi.boolean().required(),
        price: Joi.number().min(0).max(1000).required(),
        genre: Joi.required()
    };

    return Joi.validate(game, schema);
};

module.exports.gameSchema = gameSchema;
module.exports.Game = Game;
module.exports.validate = validateGame;