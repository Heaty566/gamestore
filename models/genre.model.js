const mongoose = require('mongoose');
const Joi = require('joi');


const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 1,
        required: true
    }
});

const Genre = mongoose.model('genres', genreSchema);

validateGenre = (genre) => {
    const Schema = {
        name: Joi.string().max(50).min(1).required()
    };
    return Joi.validate(genre, Schema);
};

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validate = validateGenre;