//github
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const keys = require('./config/keys');
const profileRoutes = require('./routes/profileRoutes');

//auth setup (with cookies)
const expressSession = require('express-session');
const authRoutes = require('./routes/authRoutes');
const passportSetup = require('./config/passportSetup');
const passport = require('passport');

//express app
const app = express();

//cookies setup
app.use(expressSession({
    secret: 'mySecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false, // if true: only transmit cookie over https
        httpOnly: true, // if true: prevents client side JS from reading the cookie
        maxAge: 1000 * 60 * 60 * 60, // session max age in milliseconds
        sameSite: 'lax' // make sure sameSite is not none
    }
}))


app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
//const dbURI ='mongodb+srv://netninja:test1234@nodetuts.eejw0pq.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=>{
        app.listen(5000,()=>{
            console.log('hello 5000');
        });
        console.log('connected to db');
    })
    .catch((err)=>{
        console.log(err);
    })

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended :true}));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About', user:req.user });
});

app.get('/profile', (req, res) => {
    res.render('profile', {title:'profile', user: req.user});
});

//routes
app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404', user:req.user });
});
//sabse neeche hona chaiye ye 404 vaarna
// pahle hi shoot hojayega ye
