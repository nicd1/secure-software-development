const bcrypt = require('bcrypt');

class AuthenticationController {
    passport = null;
    dbInstance = null;

    constructor (passport, dbInstance) {
        this.passport = passport;
        this.dbInstance = dbInstance;
    }

    // Called on [GET] /login
    async Login(req, res, next) {
        var messages = req.session.messages || [];
        this._ClearupSessionMessages(req, res);
        res.render('login', { messages });
    }

    // Call on [POST] /login
    async LoginPost(req, res, next) {
        this.passport.authenticate('local', (err, user, info) => {
            if (err) return next(err); 
            if (!user) 
                return this._SessionMessageRedirect(req, res, "/auth/login", "Username or password is not valid.");

            req.logIn( user, (err) => {
               if (err) return next(err); 
               return res.redirect("/");
            });
        })(req, res, next);
    }

    // Called on [GET] /logout
    async Logout(req, res, next) {
        var messages = req.session.messages || [];
        this._ClearupSessionMessages(req, res);
        res.render('login', { messages });
    }

    // Called on [POST] /logout
    async LogoutPost(req, res, next) {
        //
        res.logout();
        res.redirect('/');
    }

    _SessionMessageRedirect(req, res, redirect, messageToAdd) {
        if (req.session.messages == null || req.session.messages === undefined)
            req.session.messages = [];

        req.session.messages.push(messageToAdd);
        res.redirect(redirect);
    }

    _ClearupSessionMessages(req, res) {
        if (req.session.messages != null)
            req.session.messages = [];
    }
}

exports = module.exports = {}
module.exports.AuthenticationControllerClass = AuthenticationController;