const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res)=>{
    res.render('login', {title:'login',user: req.user});
});
//auth logout
router.get('/logout', (req, res)=>{
    console.log(req.user.username +" logged out.")
    req.logout();
    res.redirect('/');
});
//aith with google
router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect', passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile');
})
module.exports = router;