var express = require('express'),
    router = express.Router();
    User = require('./model/userdb.js');

router.get('/login', (req,res) => {
    res.render('login');
});

router.post('/login', (req,res) => {
    passport.authenticate('local',{
        successRedirect : '/home',
        failureRedirect : '/login',
        failureFlash : true,
        })(req,res,next);
});

router.get('/logout', (req,res) => {

});

module.exports = router;