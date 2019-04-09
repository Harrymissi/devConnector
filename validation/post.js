const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validatePost = data => {
    let errors = {};

    // only for fields that are required
    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, {min: 10, max: 300})) {
        errors.text = 'Post must be 10 - 300 Characters!';
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text fileds is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};