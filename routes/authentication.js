var express = require('express'),
    router = express.Router(),
    authController = require('../controller/authentication')

function createRouter(passport, DbInstance) {
    var controller = new authController.AuthenticationControllerClass(passport, DbInstance);

    register( router, controller, router.get,  '/login',  controller.Login );
    register( router, controller, router.post, '/login',  controller.LoginPost );
    register( router, controller, router.get,  '/logout', controller.Logout );
    register( router, controller, router.post, '/logout', controller.LogoutPost );

    return router;
}


function register(router, controller, routerFn, path, controllerFn) {
    routerFn.call(
        router, path, 
        (req,res,next) => controllerFn.call(controller, req, res, next));
}
exports = module.exports = {}
module.exports.createRouter = createRouter;