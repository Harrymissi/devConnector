// Authentication
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secretOrKey;
const passport = require('passport');

// Load Input validation
const validateRegister = require('../../validation/register');
const validLogin = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Private
router.get('/test', (req, res) => res.json({msg: 'User works'}));

// @route   POST api/users/register
// @desc    Register users
// @access  Public
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegister(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email }, (error, user) => {
        if (user) {
            errors.email = 'Email already exsit';
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', //Size
                r: 'pg', //Rating
                d: 'mm' // Default
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {res.json(user)})
                        .catch(err => console.log(err));
                })
            });
        }
    })
});

// @route   GET api/users/login
// @desc    Login users / Returning the token
// @access  Public
router.post('/login', (req, res) => {
    const {errors, isValid} = validLogin(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({email}).then((user) => {
        // Check for user
        if (!user) return res.status(404).json({email: 'User email not found!'});

        // Check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    // User matched
                    const payload = { id: user.id, name: user.name, avatar: user.avatar };  // Create JWT payload
                    // Sign Token
                    jwt.sign(
                        payload,
                        key,
                        { expiresIn: 3600 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token   // "Bearer" is the keyword for authenticate
                            })
                        });
                } else {
                    return res.status(400).json({password: 'invalid password'})
                }
            })
    })
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
   res.json({
       id: req.user.id,
       name: req.user.name,
       email: req.user.email
   })
});

module.exports = router;