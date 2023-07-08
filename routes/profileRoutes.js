const router = require('express').Router();
const Blog = require('../models/blog');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res)=>{
    res.render('profile', {title:'Profile', user: req.user});
});

router.get('/myblogs', (req, res)=>{
    Blog.find().sort({createdAt:-1})
        .then((result)=>{
            res.render('myblogs', {user:req.user, title: 'My Blogs', blogs: result})
        })
        .catch((err)=>{
            console.log(err);
        });
});
module.exports = router;