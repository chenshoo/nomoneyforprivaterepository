const _  = require('lodash');
const User = require('../models/user');
const config  = require('../config');
const jwt = require('jwt-simple');

function tokenForUser(user) {

    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

const authController = {

    signUp : function(req, res, next) {

        const password = _.get(req, 'body.password');
        const email = _.get(req, 'body.email');

        if (!email || !password) {
            res.status(422).send({ error: 'you must return email and password' });
        }

        console.log(email, password);

        User.findOne({ email }, function(err, existingUser) {

            if (err) {
                return res.send(err);
            };

            if(existingUser) {
                res.status(422).send({ error: 'Email is in use' })
            };

            const user = new User({ email, password });

            user.save(function(err) {

                if (err) return next(err);

                res.send({ token: tokenForUser(user) });
            });

        })
    },

    signIn : function(req, res, next) {

        if(!req.user) {
            res.send('false')
        }


        res.send({ token: tokenForUser(req.user) });
    }

}

module.exports = authController;