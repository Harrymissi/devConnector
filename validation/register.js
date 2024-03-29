const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateRegister = data => {
    let errors = {};

    // only for fields that are required
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30})) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name fileds is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email fileds is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password fileds is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30})) {
        errors.password = 'Password must at least 6 characters';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Password confirm fileds is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};