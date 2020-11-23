var express = require('express'),
passport = require('passport');

var app = express();

app.use(express.urlencoded());
app.set('port', process.env.PORT || 3000);

var session = require("express-session"),
    bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async(username, done) => {
    try {
        done(null, await dao.getUser(username));
    } catch (e) {
        done(e);
    }
});

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const user = await User.validateForm(dao, username, password);
            done(null, user);
        } catch (e) {
            done(e, undefined, { message: "Incorrect username or password." });
        }
    }
));

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }) //shows error to user
);

app.get('/login', function(req, res) {
    res.render("login");
});

app.get("/", async function(req, res) {
    if (req.isAuthenticated()) {
        try {
            const list = await dao.getAllSubmissions();
            res.render("home", {
                "submissions": list
            });
        } catch (e) {
            console.log('Error:')
            console.log(e)
        }
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
});

// a custom 404 page
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// a custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});
app.listen(app.get('port'), function () {
console.log('Express started on http://localhost:' + 
app.get('port') + '; press Ctrl-C to terminate.'
    );
});
