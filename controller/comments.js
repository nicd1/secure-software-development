class CommentsController {
    passport = null;
    commentDb = null;

    constructor (passport, userDb) {
        this.passport = passport;
        this.userDb = userDb;
    }

    // [GET] /comments
    Comments (req, res, next) {
        res.render('comments');
    }
}


exports = module.exports = {}
exports.CommentsControllerClass = CommentsController;
