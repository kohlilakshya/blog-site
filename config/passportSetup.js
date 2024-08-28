const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(err, null);
        });
});

passport.use(
    new GoogleStrategy({
        // Options for Google Strategy
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // Passport callback function (asynchronous)
        User.findOne({ googleID: profile.id })
            .then((currentUser) => {
                if (currentUser) {``
                    console.log("Existing user: " + currentUser);
                    done(null, currentUser);
                    // The user will be serialized above
                } else {
                    // If the user is not in the database, create a new user
                    new User({
                        username: profile.displayName,
                        googleID: profile.id,
                        thumbnail: profile.photos[0].value
                    })
                    .save()
                    .then((newUser) => {
                        console.log("New user created: " + newUser);
                        done(null, newUser);
                    });
                }
            })
            .catch((err) => {
                done(err, null);
            });
    })
);
