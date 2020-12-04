var express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/home');
        return;        
    }

    res.redirect('/auth/login');
});


router.get('/home', (req, res) => {
    if (!req.isAuthenticated()) { res.redirect('/auth/login'); return; }
    // 
    res.render('home');
});

module.exports = router;