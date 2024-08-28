const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const profileRoutes = require('./routes/profileRoutes');
const authRoutes = require('./routes/authRoutes');
const passportSetup = require('./config/passportSetup');
const passport = require('passport');
require('dotenv').config();

// Authentication setup (with cookies)
const expressSession = require('express-session');

// Create an Express application
const app = express();
const port = process.env.PORT;

// Cookies setup
app.use(expressSession({
    secret: 'mySecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false, // If true, only transmit cookie over HTTPS
        httpOnly: true, // If true, prevents client-side JS from reading the cookie
        maxAge: 1000 * 60 * 60 * 60, // Session max age in milliseconds
        sameSite: 'lax' // Ensure sameSite is not 'none'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log('Server running on port:',port);
        });
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });

// Register view engine
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About', user: req.user });
});

// Uncomment and use this route if profile route is needed
// app.get('/profile', (req, res) => {
//     res.render('profile', { title: 'Profile', user: req.user });
// });

// API routes
app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404', user: req.user });
});
// The 404 route should be placed at the end to catch all unmatched routes
