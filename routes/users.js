var express = require('express'),
    router = express.Router(),
    controllerUser = require('../controller/users')

function createRouter(passport, DbInstance) {
    var controller = new controllerUser.UserControllerClass(passport, DbInstance);

    router.use( (req, res, next) => {
        if (!req.isAuthenticated()) 
            return res.redirect('/');  
        return next();
    });

    register( router, controller, router.get, '/home', controller.Home );

    return router;
}

function register(router, controller, routerFn, path, controllerFn) {
    routerFn.call(
        router, path, 
        (req,res,next) => controllerFn.call(controller, req, res, next));
}

exports = module.exports = {}
module.exports.createRouter = createRouter;