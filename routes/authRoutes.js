const router = require('express').Router();
const passport = require('passport');

// Authentication login route
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login', user: req.user });
});

// Authentication logout route
router.get('/logout', (req, res) => {
    if (req.user) {
        console.log(`${req.user.username} logged out.`);
    }
    req.logout();
    res.redirect('/');
});

// Authenticate with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// Google authentication callback route
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

module.exports = router;
