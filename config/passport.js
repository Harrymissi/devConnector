/**
 *   Actually, Passport recognizes that each application has unique authentication requirements.
 *   Authentication mechanisms, known as strategies, are packaged as individual modules.
 *   Applications can choose which strategies to employ, without creating unnecessary dependencies.
 * @type {JwtStrategy}
 */

const JwtStratege = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
//const User = mongoose.model('users');
const User = require('../models/User');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStratege(opts, (jwtPayload, done) => {
        User.findById(jwtPayload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    }));
};