var express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/home');
        return;        
    }

    res.redirect('/auth/login');
});

// /home -> /user/home
router.get('/home', (req, res) => {
    res.redirect('/user/home');
});

router.get('comments', (req, res) => {
    res.redirect('/user/comments');
});

module.exports = router;