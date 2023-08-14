const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const keys = require('./keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //asynchronous
        //User.findAll({})
        User.findOne({ googleID: profile.id }).then((curUser) => {
            if (curUser) {
                console.log("old user is: " + curUser);
                done(null, curUser);
                //ab serialize hoga user upar
            }
            else {
                new User({
                    username: profile.displayName,
                    googleID: profile.id,
                    thumbnail: profile.photos[0].value
                }).save().then((newUser) => {
                    console.log("new user is: " + newUser);
                    done(null, newUser);
                });
            }
        })
    })
);