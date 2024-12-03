const Joi = require('joi');

const phoneValidator = Joi.string().pattern(/^[6-9]\d{9}$/, 'phone number').required();

const nameValidator = Joi.string().pattern(/^[A-Za-z\s]+$/, 'name').required();

const emailValidator = Joi.string().email({ tlds: { allow: ['com', 'net', 'org'] } }).required();

module.exports = {
  phoneValidator,
  nameValidator,
  emailValidator
};
