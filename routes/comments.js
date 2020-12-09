var express = require('express'),
    router = express.Router(),
    commentsController = require('../controller/comments');

function createRouter(passport, DbInstance) {
    var controller = new commentsController.CommentsControllerClass(passport, DbInstance);

    router.use( (req, res, next) => {
        if (!req.isAuthenticated()) 
            return res.redirect('/login');  
        return next();
    });

    register( router, controller, router.get, '/comments', controller.Comments );

    return router;
}

function register(router, controller, routerFn, path, controllerFn) {
    routerFn.call(
        router, path, 
        (req,res,next) => controllerFn.call(controller, req, res, next));
}

exports = module.exports = {}
module.exports.createRouter = createRouter;