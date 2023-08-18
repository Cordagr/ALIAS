const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
/// Authorizer ///
const User = require('../models/user');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //hold environmental variables//
    secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) return done(null, user);
                    //return whether user exist//
                    return done(null, false);
                })
                //if id is not within payload then return error//
                .catch(err => {
                    return done(err, false, {message: 'Server Error'});
                });
        })
    );
};
