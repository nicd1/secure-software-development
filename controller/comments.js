class CommentsController {
    passport = null;
    commentDb = null;

    // [GET] /comments
    Comments (req, res, next) {
        res.render('comments');
    }
}


exports = module.exports = {}
exports.CommentsControllerClass = CommentsController;
