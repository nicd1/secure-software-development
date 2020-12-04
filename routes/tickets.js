var express = require('express'),
    router = express.Router(),
    authController = require('../controller/authentication')

function createRouter(passport, DbHandler) {
    var controller = new authController.AuthenticationControllerClass(passport, DbHandler);

    router.get('/login',   (req,res,next) => controller.Login.call( controller, req, res, next ));
    router.post('/login',  (req,res,next) => controller.LoginPost.call( controller, req, res, next ));

    router.get('/logout',  (req,res,next) => controller.Logout.call( controller, req, res, next ));
    router.post('/logout', (req,res,next) => controller.LogoutPost.call ( controller, req, res, next));

    return router;
}

exports = module.exports = {}
module.exports.createRouter = createRouter;