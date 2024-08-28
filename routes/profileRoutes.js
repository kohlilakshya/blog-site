const router = require('express').Router();
const Blog = require('../models/blog');

// Middleware to check if the user is authenticated
const authCheck = (req, res, next) => {
    if (!req.user) {
        // Redirect to login page if the user is not authenticated
        return res.redirect('/auth/login');
    }
    next(); // Proceed to the next middleware or route handler
};

// Route to render the user's profile page
router.get('/', authCheck, (req, res) => {
    res.render('profile', { title: 'Profile', user: req.user });
});

// Route to render the user's blogs, sorted by creation date
router.get('/myblogs', authCheck, (req, res) => {
    Blog.find({ googleID: req.user.googleID }).sort({ createdAt: -1 })
        .then((result) => {
            res.render('myblogs', { user: req.user, title: 'My Blogs', blogs: result });
        })
        .catch((err) => {
            console.log('Error fetching blogs:', err);
            res.status(500).render('404', { title: 'Error' });
        });
});

module.exports = router;
