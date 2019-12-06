const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

checkId = (Id) => {
    const Schema = {
        _id: Joi.objectId()
    }

    return Joi.validate(Id);
};

module.exports.checkId = checkId;

