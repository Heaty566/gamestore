const Joi = require('joi');
Joi.objectId = require('joi')(Joi);

CheckId = (Id) => {
    const Schema = {
        _id: Joi.objectId()
    }

    return Joi.validate(Id);
};

module.exports.CheckId = CheckId;