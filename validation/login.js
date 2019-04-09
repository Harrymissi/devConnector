const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateLogin = data => {
    let errors = {};

    // only for fields that are required
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email fileds is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password fileds is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
};