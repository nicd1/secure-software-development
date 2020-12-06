var express = require('express'),
    router = express.Router(),
    controllerTickets = require('../controller/tickets')

function createRouter(passport, DbInstance) {
    var controller = new controllerTickets.TicketControllerClass(passport, DbInstance);

    router.use( (req, res, next) => {
        if (!req.isAuthenticated()) 
            return res.redirect('comments');  
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

    // /all            -> View all tickets
    // /view/:ticketId -> View ticket

    // var ticketId = req.params['ticketId']
    // dbInsatnce.Tickets.findTicket(ticketId);

    // Viewing /tickets, make the urls something like this:
    // mustache: <a href="/tickets/view/{{ticketId}}"> View Ticket </a>

function register(router, controller, routerFn, path, controllerFn) {
    routerFn.call(
        router, path, 
        (req,res,next) => controllerFn.call(controller, req, res, next));
}

exports = module.exports = {}
module.exports.createRouter = createRouter;