const mongoose = require('mongoose');
const { phoneValidator, nameValidator, emailValidator } = require('../validators/validator'); // Import the validators

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const { error } = nameValidator.validate(value);
        return !error;
      },
      message: 'Name can only contain alphabets and spaces.'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const { error } = emailValidator.validate(value);
        return !error;
      },
      message: 'Please enter a valid email address.'
    }
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const { error } = phoneValidator.validate(value);
        return !error;
      },
      message: 'Please enter a valid 10-digit Indian phone number.'
    }
  },
  photo: {
    type: String,  
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
