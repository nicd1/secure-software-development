class UserController {
    passport = null;
    userDb = null;

    constructor (passport, userDb) {
        this.passport = passport;
        this.userDb = userDb;
    }

    // [GET] /home
    Home (req, res, next) {
        res.render('home');
    }
}


exports = module.exports = {}
exports.UserControllerClass = UserController;
