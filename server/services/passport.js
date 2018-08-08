
const passport = require('passport');

const User = require('../models/user');

const config = require('../config');

const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;

const LocalStrategy = require('passport-local');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret,
}

const localLogin = new LocalStrategy({ usernameField: 'email' }, function(email, password ,done) {
    console.log('heyy')

    User.findOne({ email: email }, function(err, user) {
        if (err) return done(err, false);

        if(!user) {
            return done(null, false);
        }

        // if password === user.password
        user.comparePassword(password, function(err, isMatch) {
            console.log('--')
            if (err) return done(err, false);
            console.log('---')

            if(!isMatch) {
                console.log('---')

                return done(null, false);
            }
            console.log('----')

            return done(null, user);

        })

    })
})


const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub, function(err, user) {

        if (err) return done(err, false);

        if (user) {
            done(null, user);
        } else {
            done(false);
        }


    })

})

passport.use(jwtLogin);
passport.use(localLogin);