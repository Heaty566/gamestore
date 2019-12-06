const Joi = require('joi');
Joi.objectId = require('joi')(Joi);

checkId = (Id) => {
    const Schema = {
        _id: Joi.objectId().require()
    }

    return Joi.validate(Id);
};

module.exports.checkId = checkId;

